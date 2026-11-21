import { deliverEnquiry, readDeliveryConfig } from "@/lib/enquiry/delivery";
import { handleEnquiry } from "@/lib/enquiry/handle";
import { createRateLimiter } from "@/lib/enquiry/rate-limit";

const rateLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

const MAX_BODY_BYTES = 20_000;

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let payload: unknown = null;
  try {
    const body = await request.text();
    if (body.length <= MAX_BODY_BYTES) payload = JSON.parse(body);
  } catch {
    payload = null;
  }

  const config = readDeliveryConfig(process.env);

  const result = await handleEnquiry(payload, {
    clientKey: clientKey(request),
    rateLimiter,
    deliver: config ? (values) => deliverEnquiry(config, values) : null,
    onDeliveryError: (error) => {
      // Log the failure reason only; never the enquiry content.
      console.error(
        "[enquiries] delivery failed:",
        error instanceof Error ? error.message : "unknown error",
      );
    },
  });

  return Response.json(result.body, {
    status: result.status,
    headers: { "Cache-Control": "no-store", ...result.headers },
  });
}
