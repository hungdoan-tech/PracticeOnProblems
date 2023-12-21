class BloomFilter {
  constructor(hashFunctions) {
    this.size = Math.pow(2, 32);
    this.bits = 0;
    this.hashFunctions = hashFunctions;
  }

  add(element) {
    for (const hashFunction in this.hashFunctions) {
      const hash = hashFunction(element) % this.size; 
      this.bits |= BigInt(1) << BigInt(hash); 
    }
  }

  contains(element) {
    for (const hashFunction in this.hashFunctions) {
      const hash = hashFunction(element) % this.size;
      if ((this.bits & (BigInt(1) << BigInt(hash))) === BigInt(0)) {
        return false;
      }
    }
    return true;
  }
}

const dictionary = ["hello", "world", "example", "test"];
const bloomFilterSize = 1000;

const hashFunctions = [
  (element) => {
    let hash = 0;
    for (let i = 0; i < element.length; i++) {
      hash = (hash << 5) + element.charCodeAt(i) * 31;
    }
    return hash;
  },
];

const filter = new BloomFilter(bloomFilterSize, hashFunctions);
dictionary.forEach((word) => {
  filter.add(word);
});

console.log(filter.contains("hello")); 
console.log(filter.contains("example")); 
console.log(filter.contains("stackoverflow"));
