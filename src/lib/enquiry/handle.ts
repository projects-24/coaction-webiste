/**
 * The enquiry decision logic, kept free of framework and transport code so it
 * can be tested directly. Success is reported only after `deliver` resolves.
 */

import type { RateLimiter } from "./rate-limit";
import {
  parseEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "./schema";

export type EnquiryResponseBody =
  | { ok: true }
  | {
      ok: false;
      code:
        | "invalid"
        | "rejected"
        | "rate_limited"
        | "not_configured"
        | "delivery_failed";
      message: string;
      errors?: EnquiryErrors;
    };

export type EnquiryResult = {
  status: number;
  body: EnquiryResponseBody;
  headers?: Record<string, string>;
};

/** Humans do not complete the form faster than this. */
const MIN_FILL_TIME_MS = 2500;

export const fallbackContactMessage =
  "Please email Training@coaction.com or call +233 20 444 5551 or +233 24 878 4942 instead.";

export async function handleEnquiry(
  payload: unknown,
  context: {
    clientKey: string;
    rateLimiter: RateLimiter;
    /** null when no delivery mechanism is configured. */
    deliver: ((values: EnquiryValues) => Promise<void>) | null;
    onDeliveryError?: (error: unknown) => void;
  },
): Promise<EnquiryResult> {
  const raw = (payload && typeof payload === "object" ? payload : {}) as Record<
    string,
    unknown
  >;

  // Spam checks: a hidden field people never see, and a minimum fill time.
  const honeypot = typeof raw.companyWebsite === "string" ? raw.companyWebsite : "";
  const elapsedMs = typeof raw.elapsedMs === "number" ? raw.elapsedMs : 0;
  if (honeypot.trim() !== "" || elapsedMs < MIN_FILL_TIME_MS) {
    return {
      status: 400,
      body: {
        ok: false,
        code: "rejected",
        message: `Your message was not sent because it could not be verified. Wait a moment and try again. ${fallbackContactMessage}`,
      },
    };
  }

  const values = parseEnquiry(raw);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: 400,
      body: {
        ok: false,
        code: "invalid",
        message: "Your message was not sent. Check the highlighted fields and try again.",
        errors,
      },
    };
  }

  if (!context.deliver) {
    return {
      status: 503,
      body: {
        ok: false,
        code: "not_configured",
        message: `Your message was not sent: the online enquiry form is not available at the moment. ${fallbackContactMessage}`,
      },
    };
  }

  const limit = context.rateLimiter.check(context.clientKey);
  if (!limit.allowed) {
    return {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfterSeconds) },
      body: {
        ok: false,
        code: "rate_limited",
        message: `Your message was not sent because several enquiries have just been submitted from your connection. Try again in a few minutes. ${fallbackContactMessage}`,
      },
    };
  }

  try {
    await context.deliver(values);
  } catch (error) {
    context.onDeliveryError?.(error);
    return {
      status: 502,
      body: {
        ok: false,
        code: "delivery_failed",
        message: `Your message was not sent because of a technical problem on our side. Your details are still in the form, so you can try again. ${fallbackContactMessage}`,
      },
    };
  }

  return { status: 200, body: { ok: true } };
}
