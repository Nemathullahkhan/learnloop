import { test } from "node:test";
import assert from "node:assert/strict";
import { createLimiter } from "./limiter.js";

// A fake clock in milliseconds that the tests move by hand.
function clock(start = 0) {
  let t = start;
  return { now: () => t, advance: (ms) => { t += ms; } };
}

test("a new bucket is full: capacity takes pass, the next one fails", () => {
  const c = clock();
  const limiter = createLimiter({ capacity: 3, refillPerSec: 1, now: c.now });
  assert.equal(limiter.take(), true);
  assert.equal(limiter.take(), true);
  assert.equal(limiter.take(), true);
  assert.equal(limiter.take(), false);
});

test("tokens refill at refillPerSec", () => {
  const c = clock();
  const limiter = createLimiter({ capacity: 3, refillPerSec: 1, now: c.now });
  for (let i = 0; i < 3; i++) limiter.take();
  c.advance(1000); // one second, one token
  assert.equal(limiter.take(), true);
  assert.equal(limiter.take(), false);
});

test("half a token is not enough", () => {
  const c = clock();
  const limiter = createLimiter({ capacity: 1, refillPerSec: 1, now: c.now });
  limiter.take();
  c.advance(500);
  assert.equal(limiter.take(), false);
  c.advance(500);
  assert.equal(limiter.take(), true);
});

test("refill never goes above capacity", () => {
  const c = clock();
  const limiter = createLimiter({ capacity: 2, refillPerSec: 1, now: c.now });
  c.advance(60 * 1000); // a long idle time
  assert.equal(limiter.take(), true);
  assert.equal(limiter.take(), true);
  assert.equal(limiter.take(), false);
});

test("retryAfterSec is 0 when a token is available and rounds up otherwise", () => {
  const c = clock();
  const limiter = createLimiter({ capacity: 1, refillPerSec: 0.5, now: c.now });
  assert.equal(limiter.retryAfterSec(), 0);
  limiter.take();
  assert.equal(limiter.retryAfterSec(), 2); // 0.5 tokens per second: 2 seconds for one token
  c.advance(500);
  assert.equal(limiter.retryAfterSec(), 2); // 0.25 tokens, 1.5 seconds left, rounded up
});
