const TokenBucket = function (capacity, refillRate) {
  this.capacity = capacity;
  this.refillRate = refillRate;
  this.tokens = capacity;
  this.lastRefillTime = Date.now() / 1000; // Convert milliseconds to seconds

  this.refill = function () {
    const now = Date.now() / 1000;
    const timePassed = now - this.lastRefillTime;
    const tokensToAdd = timePassed * this.refillRate;
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefillTime = now;
  };

  this.takeToken = function () {
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  };
};

export const RateLimiter = function (capacity, refillRate) {
  this.tokenBuckets = {};
  this.capacity = capacity;
  this.refillRate = refillRate;

  this.handleRequest = function (ipAddress) {
    if (!this.tokenBuckets[ipAddress]) {
      this.tokenBuckets[ipAddress] = new TokenBucket(
        this.capacity,
        this.refillRate
      );
    }

    const tokenBucket = this.tokenBuckets[ipAddress];
    tokenBucket.refill();

    if (tokenBucket.takeToken()) {
      // Process the request
      console.log(`Request from ${ipAddress} allowed`);
      return true;
    } else {
      // Reject the request
      console.log(`Request from ${ipAddress} rejected`);
      return false;
    }
  };
};
