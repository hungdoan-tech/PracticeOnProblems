// Implement repeating-key XOR
// Here is the opening stanza of an important work of the English language:

// Burning 'em, if you ain't quick and nimble
// I go crazy when I hear a cymbal
// Encrypt it, under the key "ICE", using repeating-key XOR.

// In repeating-key XOR, you'll sequentially apply each byte of the key; the first byte of plaintext will be XOR'd against I, the next C, the next E, then I again for the 4th byte, and so on.

// It should come out to:

// 0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272
// a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f
// Encrypt a bunch of stuff using your repeating-key XOR function. Encrypt your mail. Encrypt your password file. Your .sig file. Get a feel for it. I promise, we aren't wasting your time with this.

export function byteArrToHexChars(clearMessageInByteArr) {
    const hexChars = '0123456789abcdef';
    let clearMessageInHex = '';
    for (let index = 0; index < clearMessageInByteArr.length; index++) {
        const currentByte = clearMessageInByteArr[index];
        clearMessageInHex += hexChars[currentByte >> 4];
        clearMessageInHex += hexChars[currentByte & 0b00001111];
    }

    return clearMessageInHex;
}

export function convertUTF8CharSequenceToByteArray(clearMessage) {
    const charArr = clearMessage.split('');
    const byteArr = new Uint8Array(charArr.length);

    for (let index = 0; index < charArr.length; index++) {
        let bits = charArr[index].charCodeAt(0);
        byteArr[index] = bits;
    }

    return byteArr;
}

export function repeatingKeyXORCipher(clearMessage, key) {
    const clearByteArr = convertUTF8CharSequenceToByteArray(clearMessage);
    const keyByteArr = convertUTF8CharSequenceToByteArray(key);
    const encryptedMessage = new Uint8Array(clearByteArr.length);
    let runner = 0;

    for (let index = 0; index < clearByteArr.length; index++) {
        encryptedMessage[index] = clearByteArr[index] ^ keyByteArr[runner];

        runner++;
        if (runner >= keyByteArr.length) {
            runner = 0;
        }
    }

    return encryptedMessage;
}