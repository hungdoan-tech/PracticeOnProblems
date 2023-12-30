import { assertEquals, tests } from "./TinyUTLib.js";

const oneDayInMiliseconds = 1000 * 60 * 60 * 24;

export const LRUCache = function (
  capacity,
  defaultExpirationTimeInMiliseconds = oneDayInMiliseconds
) {
  this.capacity = capacity;

  this.defaultExpirationTime = defaultExpirationTimeInMiliseconds;

  this.cache = new Map();

  this.minTimingHeap = new MinTimingHeap();

  this.get = function (key) {
    if (this.cache.has(key) === false) {
      return -1;
    }

    if (this.cache.get(key).until < performance.now()) {
      this.cache.delete(key);
      this.minTimingHeap.remove(key);
      return -1;
    }

    // best case - in cache and still not expired
    this.minTimingHeap.remove(key);
    this.minTimingHeap.insert(key);
    const oldCache = this.cache.get(key);

    this.cache.set(key, {
      value: oldCache.value,
      expirationTime: oldCache.expirationTime,
      until: performance.now() + oldCache.expirationTime,
    });
    return this.cache.get(key).value;
  };

  this.put = function (
    key,
    value,
    specificExpirationTimeInMiliseconds = this.defaultExpirationTime
  ) {
    if (this.cache.size >= this.capacity) {
      const lruKey = this.minTimingHeap.extractMin();
      this.cache.delete(lruKey);
    }

    this.cache.set(key, {
      value: value,
      expirationTime: specificExpirationTimeInMiliseconds,
      until: performance.now() + specificExpirationTimeInMiliseconds,
    });
    this.minTimingHeap.insert(key);
  };
};

const MinTimingHeap = function () {
  this.heap = [];

  this.keyToIndex = new Map();

  const Node = function (key) {
    this.key = key;
    this.time = performance.now();
  };

  this.insert = function (key) {
    const node = new Node(key);
    this.heap.push(node);
    this.keyToIndex.set(key, this.heap.length - 1);
    this.heapifyUp();
  };

  this.remove = function (key) {
    let index = this.keyToIndex.get(key);
    if (index !== undefined) {
      this.swap(index, this.heap.length - 1);
      this.heap.pop();
      this.keyToIndex.delete(key);
      this.heapifyDown(index);
    }
  };

  this.extractMin = function () {
    if (this.heap.length === 0) return null;

    const minValue = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.keyToIndex.delete(minValue.key);
    this.heapifyDown(0);

    return minValue.key;
  };

  this.heapifyUp = function () {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].time < this.heap[parentIndex].time) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  };

  this.heapifyDown = function (index) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let smallest = index;

    if (
      leftChild < this.heap.length &&
      this.heap[leftChild].time < this.heap[smallest].time
    ) {
      smallest = leftChild;
    }

    if (
      rightChild < this.heap.length &&
      this.heap[rightChild].time < this.heap[smallest].time
    ) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  };

  this.swap = function (i, j) {
    // reorg the key to index map
    this.keyToIndex.set(this.heap[i].key, j);
    this.keyToIndex.set(this.heap[j].key, i);

    // swap
    const tempValue = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tempValue;
  };
};
