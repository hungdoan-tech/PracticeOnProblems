class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefillTime = Date.now() / 1000; // Convert milliseconds to seconds
  }

  refill() {
    const now = Date.now() / 1000; 
    const timePassed = now - this.lastRefillTime;
    const tokensToAdd = timePassed * this.refillRate;
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefillTime = now;
  }

  takeToken() {
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    } else {
      return false;
    }
  }
}

class RateLimiter {
  constructor(capacity, refillRate) {
    this.tokenBuckets = {};
    this.capacity = capacity;
    this.refillRate = refillRate;
  }

  handleRequest(ipAddress) {
    if (!this.tokenBuckets[ipAddress]) {
      this.tokenBuckets[ipAddress] = new TokenBucket(this.capacity, this.refillRate);
    }

    const tokenBucket = this.tokenBuckets[ipAddress];
    tokenBucket.refill();

    if (tokenBucket.takeToken()) {
      // Process the request
      console.log(`Request from ${ipAddress} allowed`);
    } else {
      // Reject the request
      console.log(`Request from ${ipAddress} rejected`);
    }
  }
}

const rateLimiter = new RateLimiter(10, 1); // 10 tokens capacity, 1 token per second refill rate

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
  setTimeout(() => {}, 500);
});
