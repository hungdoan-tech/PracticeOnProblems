import { assertEquals, tests } from "./TinyUTLib.js";

export const LRUCache = function (capacity) {

    this.capacity = capacity;

    this.cache = new Map();

    this.minTimeHeap = new MinTimeHeap();

    this.get = function (key) {
        if (this.cache.has(key)) {
            this.minTimeHeap.remove(key);

            this.minTimeHeap.insert(key);

            return this.cache.get(key);
        } else {
            return -1;
        }
    };

    this.put = function (key, value) {
        if (this.cache.size >= this.capacity) {
            const lruKey = this.minTimeHeap.extractMin();
            this.cache.delete(lruKey);
        }

        this.cache.set(key, value);
        this.minTimeHeap.insert(key);
    };
};

const MinTimeHeap = function () {

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

        if (leftChild < this.heap.length && this.heap[leftChild].time < this.heap[smallest].time) {
            smallest = leftChild;
        }

        if (rightChild < this.heap.length && this.heap[rightChild].time < this.heap[smallest].time) {
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


tests({
    "give4EntriesKeyToValues_insertTheseEntriesToLRUTimmingCachesMax3Elements_expectedMissTheOldestElement": function () {
        const lruCache = new LRUCache(3);

        lruCache.put(10, 'one');
        lruCache.put(2, 'two');
        lruCache.put(30, 'three');

        assertEquals('one', lruCache.get(10));

        lruCache.put(4, 'four');

        assertEquals(-1, lruCache.get(2));
        assertEquals('three', lruCache.get(30));
        assertEquals('four', lruCache.get(4));
    }
});