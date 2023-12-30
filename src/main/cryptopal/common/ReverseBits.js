import { assertEquals, tests } from "../../raw_things/TinyUTLib.js";

/**
 * >> (Signed Right Shift):
 * This operator fills the vacant leftmost bits with the sign bit (the leftmost bit before the shift).
 * If the number is positive, it fills with 0; if negative, it fills with 1
 *
 * >>> (Unsigned Right Shift):
 * This operator fills the vacant leftmost bits with 0, regardless of the sign.
 * It effectively treats the number as an unsigned integer.
 *
 * In this function we want to treat the number as unsigned num, so we use Unsigned Right Shift
 * @param {num} straightBits the input num
 * @returns {num} the result num when treat reverse bits as number
 */
export function reverseBits(straightBits) {
  let reverseBits = 0b0;

  let shilftLeftBits = 31;
  while (straightBits > 0) {
    const oneLSB = straightBits & 0b1;
    reverseBits = reverseBits | (oneLSB << shilftLeftBits);
    straightBits = straightBits >>> 1;
    shilftLeftBits--;
  }

  return reverseBits >>> 0;
}

tests({
  givePositiveNumberMSBIs0_reverseBits_expectCorrectReverseBitsWhenTreatAsNumber:
    function () {
      const n = 0b00000010100101000001111010011100;
      const result = reverseBits(n);
      assertEquals(0b00111001011110000010100101000000, result);
    },

  giveNegativeNumberMSBIs1_reverseBits_expectCorrectReverseBitsWhenTreatAsNumber:
    function () {
      const n = 0b11111111111111111111111111111101;
      const result = reverseBits(n);
      assertEquals(0b10111111111111111111111111111111, result);
    },
});
