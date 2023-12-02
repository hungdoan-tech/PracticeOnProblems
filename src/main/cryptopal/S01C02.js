// Fixed XOR
// Write a function that takes two equal-length buffers and produces their XOR combination.

// If your function works properly, then when you feed it the string:

// 1c0111001f010100061a024b53535009181c
// ... after hex decoding, and when XOR'd against:

// 686974207468652062756c6c277320657965
// ... should produce:

// 746865206b696420646f6e277420706c6179
import { assertEquals, tests } from "../javascript/TinyUTLib.js";

function decodeAndXOR(firstBuffer, secondBuffer) {

    if (firstBuffer.length !== secondBuffer.length) {
        throw Error('Illegal Argument Exception - two input buffers are not equal');
    }

    finalResult = '';
    for (let index = 0; index < firstBuffer.length; index++) {
        firstDec = parseInt(firstBuffer[index], 16);
        secondDec = parseInt(secondBuffer[index], 16);
        xorResult = firstDec ^ secondDec;
        finalResult += xorResult;
    }

    return finalResult;
}

function perform() {
    tests({
        'give2MessageInHex_xorTheseTwoMessage_expectCorrectXORResult': function () {
            const firstBuffer = '1c0111001f010100061a024b53535009181c';
            const secondBuffer = '686974207468652062756c6c277320657965';
            const xorResult = decodeAndXOR(firstBuffer, secondBuffer);
            assertEquals('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t', xorResult);
            console.log(`From 2 message in hex ${firstBuffer} and ${secondBuffer} - we XOR it and the result is ${xorResult}`);
        }
    });
}