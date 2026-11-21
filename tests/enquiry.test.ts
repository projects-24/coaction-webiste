import { describe, expect, it, vi } from "vitest";
import { formatEnquiryEmail, readDeliveryConfig } from "@/lib/enquiry/delivery";
import { handleEnquiry } from "@/lib/enquiry/handle";
import { createRateLimiter } from "@/lib/enquiry/rate-limit";
import { emptyEnquiry, parseEnquiry, validateEnquiry } from "@/lib/enquiry/schema";

const valid = {
  type: "programme",
  name: "Ama Mensah",
  email: "ama@example.com",
  programme: "petroleum-economics",
  message: "Please send me information about this programme.",
  companyWebsite: "",
  elapsedMs: 8000,
};

const context = (overrides: Partial<Parameters<typeof handleEnquiry>[1]> = {}) => ({
  clientKey: "203.0.113.1",
  rateLimiter: createRateLimiter({ limit: 5, windowMs: 60_000 }),
  deliver: vi.fn().mockResolvedValue(undefined),
  ...overrides,
});

describe("enquiry validation", () => {
  it("accepts a complete programme enquiry", () => {
    expect(validateEnquiry(parseEnquiry(valid))).toEqual({});
  });

  it("requires name, a well-formed email and a message", () => {
    const errors = validateEnquiry({ ...emptyEnquiry, email: "not-an-email" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("requires a programme for programme enquiries, and it must exist", () => {
    expect(validateEnquiry(parseEnquiry({ ...valid, programme: "" })).programme).toBeDefined();
    expect(validateEnquiry(parseEnquiry({ ...valid, programme: "made-up" })).programme).toBeDefined();
  });

  it("requires an organisation for corporate requests only", () => {
    const corporate = parseEnquiry({ ...valid, type: "corporate", programme: "" });
    expect(validateEnquiry(corporate).organisation).toBeDefined();
    expect(validateEnquiry({ ...corporate, organisation: "Example Ltd" })).toEqual({});
    expect(validateEnquiry(parseEnquiry({ ...valid, type: "general", programme: "" }))).toEqual({});
  });

  it("treats telephone as optional but checks its format when given", () => {
    expect(validateEnquiry(parseEnquiry({ ...valid, phone: "+233 20 444 5551" }))).toEqual({});
    expect(validateEnquiry(parseEnquiry({ ...valid, phone: "call me" })).phone).toBeDefined();
  });

  it("coerces hostile input instead of trusting it", () => {
    const parsed = parseEnquiry({ type: "admin", name: ["x"], email: 5, message: "  hi\r\nthere  " });
    expect(parsed.type).toBe("general");
    expect(parsed.name).toBe("");
    expect(parsed.email).toBe("");
    expect(parsed.message).toBe("hi\nthere");
    expect(parseEnquiry({ name: "A\r\nBcc: x@example.com" }).name).toBe("A Bcc: x@example.com");
  });
});

describe("enquiry handling", () => {
  it("confirms only after delivery succeeds", async () => {
    const deliver = vi.fn().mockResolvedValue(undefined);
    const result = await handleEnquiry(valid, context({ deliver }));
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ ok: true });
    expect(deliver).toHaveBeenCalledOnce();
    expect(deliver.mock.calls[0][0]).toMatchObject({
      type: "programme",
      programme: "petroleum-economics",
      email: "ama@example.com",
    });
  });

  it("rejects invalid input with field errors and does not deliver", async () => {
    const ctx = context();
    const result = await handleEnquiry({ ...valid, email: "nope", name: "" }, ctx);
    expect(result.status).toBe(400);
    expect(result.body).toMatchObject({ ok: false, code: "invalid" });
    expect(result.body.ok === false && result.body.errors).toHaveProperty("email");
    expect(ctx.deliver).not.toHaveBeenCalled();
  });

  it("never reports success when delivery is not configured", async () => {
    const result = await handleEnquiry(valid, context({ deliver: null }));
    expect(result.status).toBe(503);
    expect(result.body).toMatchObject({ ok: false, code: "not_configured" });
    expect(result.body.ok === false && result.body.message).toContain("Training@coaction.com");
    expect(result.body.ok === false && result.body.message).toContain("not sent");
  });

  it("never reports success when delivery fails, and reports the failure", async () => {
    const onDeliveryError = vi.fn();
    const result = await handleEnquiry(
      valid,
      context({ deliver: vi.fn().mockRejectedValue(new Error("smtp down")), onDeliveryError }),
    );
    expect(result.status).toBe(502);
    expect(result.body).toMatchObject({ ok: false, code: "delivery_failed" });
    expect(result.body.ok === false && result.body.message).toContain("+233 20 444 5551");
    expect(onDeliveryError).toHaveBeenCalledOnce();
  });

  it("rejects submissions that fill the hidden field or arrive too fast", async () => {
    const ctx = context();
    const bot = await handleEnquiry({ ...valid, companyWebsite: "http://spam.example" }, ctx);
    const fast = await handleEnquiry({ ...valid, elapsedMs: 200 }, ctx);
    const missing = await handleEnquiry({ ...valid, elapsedMs: undefined }, ctx);
    for (const result of [bot, fast, missing]) {
      expect(result.status).toBe(400);
      expect(result.body).toMatchObject({ ok: false, code: "rejected" });
    }
    expect(ctx.deliver).not.toHaveBeenCalled();
  });

  it("handles malformed payloads", async () => {
    const ctx = context();
    for (const payload of [null, "text", 42, []]) {
      const result = await handleEnquiry(payload, ctx);
      expect(result.status).toBe(400);
    }
    expect(ctx.deliver).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions from one client", async () => {
    const ctx = context({ rateLimiter: createRateLimiter({ limit: 2, windowMs: 60_000 }) });
    expect((await handleEnquiry(valid, ctx)).status).toBe(200);
    expect((await handleEnquiry(valid, ctx)).status).toBe(200);
    const limited = await handleEnquiry(valid, ctx);
    expect(limited.status).toBe(429);
    expect(limited.headers?.["Retry-After"]).toBeDefined();
    expect(ctx.deliver).toHaveBeenCalledTimes(2);
    // A different client is unaffected.
    expect((await handleEnquiry(valid, { ...ctx, clientKey: "198.51.100.7" })).status).toBe(200);
  });
});

describe("rate limiter", () => {
  it("allows requests again once the window has passed", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 500)).toEqual({ allowed: false, retryAfterSeconds: 1 });
    expect(limiter.check("a", 1001).allowed).toBe(true);
  });
});

describe("delivery configuration", () => {
  it("is absent unless a mechanism is fully configured", () => {
    expect(readDeliveryConfig({})).toBeNull();
    expect(readDeliveryConfig({ ENQUIRY_DELIVERY: "smtp" })).toBeNull();
    expect(readDeliveryConfig({ ENQUIRY_DELIVERY: "smtp", SMTP_HOST: "mail.example.com" })).toBeNull();
    expect(readDeliveryConfig({ ENQUIRY_DELIVERY: "webhook" })).toBeNull();
    expect(readDeliveryConfig({ ENQUIRY_DELIVERY: "webhook", ENQUIRY_WEBHOOK_URL: "ftp://x" })).toBeNull();
    expect(readDeliveryConfig({ ENQUIRY_DELIVERY: "carrier-pigeon" })).toBeNull();
  });

  it("reads SMTP and webhook settings", () => {
    expect(
      readDeliveryConfig({
        ENQUIRY_DELIVERY: "smtp",
        SMTP_HOST: "mail.example.com",
        SMTP_PORT: "465",
        ENQUIRY_TO_EMAIL: "inbox@example.com",
        ENQUIRY_FROM_EMAIL: "website@example.com",
      }),
    ).toMatchObject({ kind: "smtp", port: 465, secure: true, to: "inbox@example.com" });
    expect(
      readDeliveryConfig({ ENQUIRY_DELIVERY: "webhook", ENQUIRY_WEBHOOK_URL: "https://hooks.example.com/x" }),
    ).toEqual({ kind: "webhook", url: "https://hooks.example.com/x", secret: undefined });
  });

  it("formats a readable email with the programme title", () => {
    const email = formatEnquiryEmail(parseEnquiry({ ...valid, organisation: "Example Ltd" }));
    expect(email.subject).toBe("Programme enquiry: Petroleum Economics — Ama Mensah");
    expect(email.text).toContain("Organisation: Example Ltd");
    expect(email.text).toContain("Please send me information");
    expect(email.text).not.toContain("Telephone:");
  });
});
