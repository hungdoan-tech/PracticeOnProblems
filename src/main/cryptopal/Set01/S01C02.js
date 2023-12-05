// Fixed XOR
// Write a function that takes two equal-length buffers and produces their XOR combination.

// If your function works properly, then when you feed it the string:

// 1c0111001f010100061a024b53535009181c
// ... after hex decoding, and when XOR'd against:

// 686974207468652062756c6c277320657965
// ... should produce:

// 746865206b696420646f6e277420706c6179
const hexChars = '0123456789abcdef';
export function convertUTF8CharCodeToHexChar(charCode) {
    if (charCode > 15) {
        throw Error('The input char code is over the hex base');
    }
    return hexChars[charCode];
}

export function xorTwoHexMessages(firstHexMessage, secondHexMessage) {

    if (firstHexMessage.length !== secondHexMessage.length) {
        throw Error('Illegal Argument Exception - two input buffers are not equal');
    }

    let finalResult = '';
    for (let index = 0; index < firstHexMessage.length; index++) {
        const firstDec = parseInt(firstHexMessage[index], 16);
        const secondDec = parseInt(secondHexMessage[index], 16);
        const xorResult = firstDec ^ secondDec;
        finalResult += convertUTF8CharCodeToHexChar(xorResult);
    }

    return finalResult;
}