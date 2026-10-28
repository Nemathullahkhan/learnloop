import http from "node:http";
import { createLimiter } from "./limiter.js";

const PORT = Number(process.env.PORT) || 3000;
const CAPACITY = Number(process.env.CAPACITY) || 5;
const REFILL_PER_SEC = Number(process.env.REFILL_PER_SEC) || 1;

// One bucket for the whole server. A real limiter keeps one bucket per client.
const limiter = createLimiter({ capacity: CAPACITY, refillPerSec: REFILL_PER_SEC });

const server = http.createServer((req, res) => {
  if (req.method !== "GET" || req.url !== "/ping") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("not found\n");
  }
  if (!limiter.take()) {
    res.writeHead(429, { "Content-Type": "text/plain", "Retry-After": String(limiter.retryAfterSec()) });
    return res.end("too many requests\n");
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("pong\n");
});

server.listen(PORT, () => console.log(`listening on http://localhost:${PORT}/ping (capacity ${CAPACITY}, ${REFILL_PER_SEC}/s)`));
