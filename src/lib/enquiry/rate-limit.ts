/**
 * A small in-memory, per-client sliding-window limiter. It protects a single
 * long-running server process. On serverless or multi-instance hosting each
 * instance keeps its own counts, so pair it with the host's own rate limiting.
 */

export type RateLimiter = {
  check(key: string, now?: number): { allowed: boolean; retryAfterSeconds: number };
};

export function createRateLimiter(options: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}): RateLimiter {
  const { limit, windowMs, maxKeys = 5000 } = options;
  const hits = new Map<string, number[]>();

  return {
    check(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

      if (recent.length >= limit) {
        hits.set(key, recent);
        const retryAfterSeconds = Math.ceil((recent[0] + windowMs - now) / 1000);
        return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
      }

      recent.push(now);
      hits.delete(key);
      hits.set(key, recent);

      // Bound memory: drop the least recently used keys.
      while (hits.size > maxKeys) {
        const oldest = hits.keys().next().value;
        if (oldest === undefined) break;
        hits.delete(oldest);
      }

      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}
