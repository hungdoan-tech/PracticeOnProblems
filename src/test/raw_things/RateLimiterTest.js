import { RateLimiter } from "../../main/raw_things/RateLimiter.js";

const rateLimiter = new RateLimiter(5, 5 / 60); // 10 tokens capacity, 1 token per second refill rate

const requests = [
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.1",
  "192.168.1.2",
];

requests.forEach((request) => {
  rateLimiter.handleRequest(request);
  setTimeout(() => {}, 1000 * 5);
});
