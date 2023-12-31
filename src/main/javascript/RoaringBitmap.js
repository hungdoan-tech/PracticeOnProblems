class RoaringBitmap {
  constructor() {
    this.array = [];
  }

  add(value) {
    const arrayIndex = Math.floor(value / 32);
    const bitIndex = value % 32;
    if (!this.array[arrayIndex]) {
      this.array[arrayIndex] = 0;
    }
    this.array[arrayIndex] |= 1 << bitIndex;
  }

  contains(value) {
    const arrayIndex = Math.floor(value / 32);
    const bitIndex = value % 32;
    if (!this.array[arrayIndex]) {
      return false;
    }
    return (this.array[arrayIndex] & (1 << bitIndex)) !== 0;
  }

  remove(value) {
    const arrayIndex = Math.floor(value / 32);
    const bitIndex = value % 32;
    if (this.array[arrayIndex]) {
      this.array[arrayIndex] &= ~(1 << bitIndex);
    }
  }

  toArray() {
    const result = [];
    for (let i = 0; i < this.array.length; i++) {
      const base = i * 32;
      let bits = this.array[i];
      while (bits !== 0) {
        const t = bits & -bits;
        const r = Math.log2(t);
        result.push(base + r);
        bits &= bits - 1;
      }
    }
    return result;
  }
}

const bitmap = new RoaringBitmap();
bitmap.add(3);
bitmap.add(5);
bitmap.add(10);
console.log(bitmap.toArray()); // Output: [3, 5, 10]
console.log(bitmap.contains(5)); // Output: true
bitmap.remove(5);
console.log(bitmap.toArray()); // Output: [3, 10]
console.log(bitmap.contains(5)); // Output: false
