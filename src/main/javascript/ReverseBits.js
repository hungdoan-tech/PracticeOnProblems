import { assertEquals, tests } from "./TinyUTLib.js";


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
 * @param {num} n the input num
 * @returns {num} the result num when treat reverse bits as number
 */
var reverseBits = function (n) {
    let result = 0b0;

    let runner = 31;
    while (n > 0) {
        const oneLSB = n & 0b1;
        result = result | oneLSB << runner;
        n = n >>> 1;
        runner--;
    }

    return result >>> 0;
};

tests({
    'givePositiveNumberMSBIs0_reverseBits_expectCorrectReverseBitsWhenTreatAsNumber': function () {
        const n = 0b00000010100101000001111010011100;
        const result = reverseBits(n);
        assertEquals(0b00111001011110000010100101000000, result);
    },

    'giveNegativeNumberMSBIs1_reverseBits_expectCorrectReverseBitsWhenTreatAsNumber': function () {
        const n = 0b11111111111111111111111111111101;
        const result = reverseBits(n);
        assertEquals(0b10111111111111111111111111111111, result);
    }
});
