// Should produce a Dynamic Programming approach rather than the current version

const countBits = function (n) {
  const output = [];

  for (let index = 0; index <= n; index++) {
    let counter = 0;
    let num = index;
    while (num > 0) {
      if (num & 0b1) {
        counter++;
      }
      num = num >>> 1;
    }
    output.push(counter);
  }

  return output;
};

console.log(countBits(5));
