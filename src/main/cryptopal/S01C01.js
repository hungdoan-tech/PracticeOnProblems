// Convert hex to base64
// The string:
//
//     49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d
//
// Should produce:
//
//     SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t
//
// Cryptopals Rule
// Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing.

const b64EncodingTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const Status = {
    START_NEW: 0,
    TAKE_2: 1,
    TAKE_4: 2
};

/**
 * You will always need 3 hex(4 bits) to construct 2 base64(6 bits)
 * Just use simple bitwise operations to achieve this purpose
 * @param hexData
 * @returns {string}
 */
function hexToBase64(hexData) {
    let b64Data = "";
    let sixBits = 0;
    let currentStatus = Status.START_NEW;

    for (const hexChar of hexData) {
        // treat the bits of a char as an integer, and restrict this input bits could not be over the value 16
        // (max values of 4 bits be treated in base decimal)
        const dec = parseInt(hexChar, 16);

        if (currentStatus === Status.START_NEW) {
            sixBits = dec;
            currentStatus = Status.TAKE_2;
        } else if (currentStatus === Status.TAKE_2) {
            sixBits = (sixBits << 2) | (dec >> 2);
            b64Data += b64EncodingTable[sixBits];

            sixBits = dec & 0b0011;
            currentStatus = Status.TAKE_4;
        } else if (currentStatus === Status.TAKE_4) {
            sixBits = (sixBits << 4) | dec;
            b64Data += b64EncodingTable[sixBits];
            currentStatus = Status.START_NEW;
        }
    }

    // case the has loop through the final char but still remain an unfinished part
    // = and == will be acted as a hints when decode the based64 to original bits
    // = means it's last state was still need two more bits - temporary shift left 4 bit to construct 6 bit - when decode take 4 bits from last encoded bits
    // similar for ==, when decode take 2 bits from last encoded bits
    if (currentStatus === Status.TAKE_2) {
        sixBits <<= 2;
        b64Data += b64EncodingTable[sixBits] + "=";
    } else if (currentStatus === Status.TAKE_4) {
        sixBits <<= 4;
        b64Data += b64EncodingTable[sixBits] + "==";
    }

    return b64Data;
}

// Example usage
const result = hexToBase64("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d");

console.log(result);
