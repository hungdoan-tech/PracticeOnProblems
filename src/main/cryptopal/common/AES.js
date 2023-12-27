// Let's code a simple AES - Rijndael impl or learning purpose

// MixColumns transformation matrix
const mixColumnsMatrix = [
  [0x02, 0x03, 0x01, 0x01],
  [0x01, 0x02, 0x03, 0x01],
  [0x01, 0x01, 0x02, 0x03],
  [0x03, 0x01, 0x01, 0x02],
];

// Helper function for multiplication in GF(2^8)
/**
 * Algorithm: The function uses a simple algorithm to perform the multiplication by leveraging the properties of the finite field:

* It initializes a variable p to 0, which will hold the result of the multiplication.
* It iterates through the bits of b (from the least significant bit to the most significant bit) using a loop that runs 8 times (since each byte consists of 8 bits).
* For each bit of b, if the bit is 1, it XORs a with p. This step corresponds to adding a to p if the corresponding bit in b is 1.
* Then, it checks if the highest bit of a is set (i.e., if a is greater than or equal to 128 in decimal or 0x80 in hexadecimal). If it is, it performs a 
* modular reduction by XORing a with the irreducible polynomial 0x1B. This step is necessary to keep the result within the finite field.
* Finally, it shifts b to the right by 1 bit, effectively moving to the next bit of b for the next iteration of the loop.
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function multiplyInGF(a, b) {
  let p = 0;
  for (let i = 0; i < 8; i++) {
    if (b & 1) {
      p ^= a;
    }
    const highBitSet = a & 0x80;
    a <<= 1;
    if (highBitSet) {
      a ^= 0x1b; // Modulus polynomial x^8 + x^4 + x^3 + x + 1
    }
    b >>= 1;
  }
  return p % 256;
}

// Perform MixColumns step
function mixColumns(state) {
  const result = [];
  for (let i = 0; i < 4; i++) {
    const column = [];
    for (let j = 0; j < 4; j++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum ^= multiplyInGF(mixColumnsMatrix[i][k], state[k][j]);
      }
      column.push(sum);
    }
    result.push(column);
  }
  return result;
}

// Example state matrix
const stateMatrix = [
  [0x63, 0xeb, 0x9f, 0xa0],
  [0xc0, 0x2f, 0x93, 0x92],
  [0xab, 0x30, 0xaf, 0xc7],
  [0x20, 0xcb, 0x2b, 0xa2],
];

// Perform MixColumns step
const mixedState = mixColumns(stateMatrix);

// Print the result
for (const row of mixedState) {
  console.log(row.map((x) => x.toString(16).padStart(2, "0")).join(" "));
}


//it should produce the following result 
// 0e 0b 0c 0d
// 0b 0e 0d 0c
// 0d 0b 0e 0b
// 0c 0d 0b 0e
