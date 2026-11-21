/**
 * Server-only enquiry delivery. An enquiry is "sent" only when the configured
 * mechanism accepts it:
 *
 *   ENQUIRY_DELIVERY=smtp     the SMTP server accepts the message for the inbox
 *   ENQUIRY_DELIVERY=webhook  the receiving endpoint answers with a 2xx status
 *
 * See .env.example for the settings each mechanism needs.
 */

import "server-only";
import nodemailer from "nodemailer";
import { getProgramme } from "@/content/programmes";
import {
  enquiryTypeLabel,
  serviceOptions,
  type EnquiryValues,
} from "./schema";

export type DeliveryConfig =
  | {
      kind: "smtp";
      host: string;
      port: number;
      secure: boolean;
      user?: string;
      password?: string;
      to: string;
      from: string;
    }
  | { kind: "webhook"; url: string; secret?: string };

export type Env = Record<string, string | undefined>;

/** Returns null when delivery is not (or not completely) configured. */
export function readDeliveryConfig(env: Env): DeliveryConfig | null {
  const mechanism = env.ENQUIRY_DELIVERY?.trim().toLowerCase();

  if (mechanism === "smtp") {
    const host = env.SMTP_HOST?.trim();
    const to = env.ENQUIRY_TO_EMAIL?.trim();
    const from = env.ENQUIRY_FROM_EMAIL?.trim();
    if (!host || !to || !from) return null;
    const port = Number(env.SMTP_PORT ?? 587);
    if (!Number.isInteger(port) || port <= 0) return null;
    return {
      kind: "smtp",
      host,
      port,
      secure: env.SMTP_SECURE ? env.SMTP_SECURE === "true" : port === 465,
      user: env.SMTP_USER?.trim() || undefined,
      password: env.SMTP_PASSWORD || undefined,
      to,
      from,
    };
  }

  if (mechanism === "webhook") {
    const url = env.ENQUIRY_WEBHOOK_URL?.trim();
    if (!url || !/^https?:\/\//i.test(url)) return null;
    return {
      kind: "webhook",
      url,
      secret: env.ENQUIRY_WEBHOOK_SECRET || undefined,
    };
  }

  return null;
}

function describeSubject(values: EnquiryValues) {
  const programme = values.programme
    ? getProgramme(values.programme)?.title
    : undefined;
  const service = serviceOptions.find((s) => s.id === values.service)?.label;
  return { programme, service };
}

export function formatEnquiryEmail(values: EnquiryValues) {
  const { programme, service } = describeSubject(values);
  const typeLabel = enquiryTypeLabel(values.type);
  const rows: [string, string | undefined][] = [
    ["Enquiry type", typeLabel],
    ["Name", values.name],
    ["Email", values.email],
    ["Telephone", values.phone],
    ["Organisation", values.organisation],
    ["Programme", programme],
    ["Service area", service],
    ["Estimated participants", values.participants],
    ["Preferred timeframe", values.timeframe],
  ];
  const summary = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return {
    subject: `${typeLabel}${programme ? `: ${programme}` : ""} — ${values.name}`,
    text: `${summary}\n\nMessage:\n${values.message}\n\n—\nSent from the Coaction Company Limited website enquiry form.`,
  };
}

async function sendBySmtp(
  config: Extract<DeliveryConfig, { kind: "smtp" }>,
  values: EnquiryValues,
) {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth:
      config.user && config.password
        ? { user: config.user, pass: config.password }
        : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  const { subject, text } = formatEnquiryEmail(values);
  const info = await transport.sendMail({
    from: config.from,
    to: config.to,
    replyTo: { name: values.name, address: values.email },
    subject,
    text,
  });
  if (!info.accepted || info.accepted.length === 0) {
    throw new Error("SMTP server did not accept the message for any recipient");
  }
}

async function sendByWebhook(
  config: Extract<DeliveryConfig, { kind: "webhook" }>,
  values: EnquiryValues,
) {
  const { programme, service } = describeSubject(values);
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(config.secret ? { Authorization: `Bearer ${config.secret}` } : {}),
    },
    body: JSON.stringify({
      source: "coaction-website-enquiry-form",
      submittedAt: new Date().toISOString(),
      enquiryTypeLabel: enquiryTypeLabel(values.type),
      programmeTitle: programme ?? null,
      serviceLabel: service ?? null,
      ...values,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Webhook responded with status ${response.status}`);
  }
}

/** Resolves only when the configured mechanism has accepted the enquiry. */
export async function deliverEnquiry(
  config: DeliveryConfig,
  values: EnquiryValues,
): Promise<void> {
  if (config.kind === "smtp") return sendBySmtp(config, values);
  return sendByWebhook(config, values);
}
