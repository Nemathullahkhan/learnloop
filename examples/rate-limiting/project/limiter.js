// Token bucket: the bucket holds up to `capacity` tokens and gains `refillPerSec`
// tokens every second. Each request takes one token. No tokens means "too many requests".
// Refill is lazy: tokens are added when someone asks, using the time since the last ask.
export function createLimiter({ capacity, refillPerSec, now = Date.now }) {
  let tokens = capacity;
  let lastMs = now(); // now() returns milliseconds

  function refill() {
    const nowMs = now();
    const elapsedSec = (nowMs - lastMs) / 1000; // convert once, name the unit
    tokens = Math.min(capacity, tokens + elapsedSec * refillPerSec);
    lastMs = nowMs;
  }

  return {
    take() {
      refill();
      if (tokens < 1) return false;
      tokens -= 1;
      return true;
    },
    // Whole seconds until one token is available; 0 if one is available now.
    retryAfterSec() {
      refill();
      if (tokens >= 1) return 0;
      return Math.ceil((1 - tokens) / refillPerSec);
    },
  };
}
