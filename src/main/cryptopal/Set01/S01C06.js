// The content in file S01C06.txt been base64'd after being encrypted with repeating-key XOR.

// Decrypt it.

// Here's how:

// Let KEYSIZE be the guessed length of the key; try values from 2 to (say) 40.
// Write a function to compute the edit distance/Hamming distance between two strings. The Hamming distance is just the number of differing bits. The distance between:
// this is a test
// and
// wokka wokka!!!
// is 37. Make sure your code agrees before you proceed.
// For each KEYSIZE, take the first KEYSIZE worth of bytes, and the second KEYSIZE worth of bytes, and find the edit distance between them. Normalize this result by dividing by KEYSIZE.
// The KEYSIZE with the smallest normalized edit distance is probably the key. You could proceed perhaps with the smallest 2-3 KEYSIZE values. Or take 4 KEYSIZE blocks instead of 2 and average the distances.
// Now that you probably know the KEYSIZE: break the ciphertext into blocks of KEYSIZE length.
// Now transpose the blocks: make a block that is the first byte of every block, and a block that is the second byte of every block, and so on.
// Solve each block as if it was single-character XOR. You already have code to do this.
// For each block, the single-byte XOR key that produces the best looking histogram is the repeating-key XOR key byte for that block. Put them together and you have the key.
// This code is going to turn out to be surprisingly useful later on. Breaking repeating-key XOR ("Vigenere") statistically is obviously an academic exercise, a "Crypto 101" thing. But more people "know how" to break it than can actually break it, and a similar technique breaks something much more important.
import fs from 'fs';
import { bruteForceDecryptXORSingleCharCipher } from './S01C03.js';

const b64EncodingChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const base64CharToIndex = new Map();
[...b64EncodingChars].forEach((char, index) => {
    base64CharToIndex.set(char, index);
});

const Status = {
    START_NEW: 0,
    TAKE_2: 1,
    TAKE_4: 2,
    TAKE_6: 3,
};

export function convertBase64SequenceToByteArr(base64Message) {
    let base64CharArr = base64Message.split('');

    // We always need 4 base64 chars to construct 3 bytes
    const encryptedByteArr = new Uint8Array((base64CharArr.length * 3) / 4);

    let currentStatus = Status.START_NEW;
    let currentBits = 0;
    let runner = 0;

    for (let index = 0; index < base64CharArr.length; index++) {
        const bits = base64CharToIndex.get(base64CharArr[index]);

        if (bits === undefined) {
            // Invalid character like \r \n
            continue;
        }

        if (currentStatus === Status.START_NEW) {
            currentBits = bits;
            currentStatus = Status.TAKE_2;
            continue;
        }

        if (currentStatus === Status.TAKE_2) {
            currentBits = (currentBits << 2) | (bits >>> 4);
            encryptedByteArr[runner] = currentBits;
            currentBits = bits & 0b001111;
            currentStatus = Status.TAKE_4;
            runner++;
            continue;
        }

        if (currentStatus === Status.TAKE_4) {
            currentBits = (currentBits << 4) | (bits >>> 2);
            encryptedByteArr[runner] = currentBits;
            currentBits = bits & 0b000011;
            currentStatus = Status.TAKE_6;
            runner++;
            continue;
        }

        if (currentStatus === Status.TAKE_6) {
            currentBits = (currentBits << 6) | bits;
            encryptedByteArr[runner] = currentBits;
            currentStatus = Status.START_NEW;
            runner++;
            continue;
        }
    }

    // Handle padding
    if (currentStatus !== Status.START_NEW) {
        encryptedByteArr[runner] = currentBits << (6 * (4 - currentStatus));
    }

    return encryptedByteArr.subarray(0, runner);
}

export async function getByteArrFromFileContainBase64Sequence(filePath) {
    const fileContent = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    return convertBase64SequenceToByteArr(fileContent);
}

export function calculateHammingDistance(firstByteArr, secondByteArr) {

    if (firstByteArr.length !== secondByteArr.length) {
        throw Error(' Invalid Input - lenght is not equal');
    }

    const xorResult = [];
    let runner = 0;
    while (runner < firstByteArr.length) {
        xorResult.push(firstByteArr[runner] ^ secondByteArr[runner]);
        runner++;
    }

    let hammingDistance = 0;
    for (let index = 0; index < xorResult.length; index++) {

        let examinedBits = xorResult[index];
        let differentBits = 0;
        while (examinedBits > 0) {
            differentBits += examinedBits & 0b00000001;
            examinedBits = examinedBits >>> 1;
        }
        hammingDistance += differentBits;
    }

    return hammingDistance;
}

export function findKeyLengthInRepeatingXORCipher(encryptedByteArr) {

    let result = {
        distance: Infinity,
        keyLength: -1
    };

    for (let keyLength = 2; keyLength <= 40; keyLength++) {

        let wholeTextHammingDistance = 0;
        let start = 0;
        let end = start + keyLength;

        let totalChunksHaveBeenExamined = 0;
        while (encryptedByteArr.length - end >= keyLength) {
            const firstChunk = encryptedByteArr.slice(start, end);
            const secondChunk = encryptedByteArr.slice(end, end + keyLength);

            const twoChunksHammingDistance = calculateHammingDistance(firstChunk, secondChunk);
            const averageHammingDistancePerBytes = twoChunksHammingDistance / keyLength;

            wholeTextHammingDistance += averageHammingDistancePerBytes;
            start = end + keyLength;
            end = start + keyLength;
            totalChunksHaveBeenExamined += 2;
        }

        wholeTextHammingDistance /= totalChunksHaveBeenExamined;
        if (wholeTextHammingDistance < result.distance) {
            result = {
                distance: wholeTextHammingDistance,
                keyLength: keyLength
            };
        }
    }

    return result.keyLength;
}

function transposeChunksFromEncryptedArrByKeySize(encryptedByteArr, keyLength) {
    const byteKeyIndexToEncryptedByteChunks = new Map();

    let chunkIndex = 0;
    for (let byteArrIndex = 0; byteArrIndex < encryptedByteArr.length; byteArrIndex++) {
        const octet = encryptedByteArr[byteArrIndex];

        if (chunkIndex == keyLength) {
            chunkIndex = 0;
        }

        if (byteKeyIndexToEncryptedByteChunks.get(chunkIndex) === undefined) {
            byteKeyIndexToEncryptedByteChunks.set(chunkIndex, []);
        }

        byteKeyIndexToEncryptedByteChunks.get(chunkIndex).push(octet);
        byteKeyIndexToEncryptedByteChunks.set(chunkIndex, byteKeyIndexToEncryptedByteChunks.get(chunkIndex));

        chunkIndex += 1;
    }

    return byteKeyIndexToEncryptedByteChunks;
}

export function decryptRepeatingXORKey(encryptedByteArr, keyLength) {

    const byteKeyIndexToEncryptedByteChunks = transposeChunksFromEncryptedArrByKeySize(encryptedByteArr, keyLength);

    // find out the key
    const candidateChunkKeys = [];
    for (let byteKeyIndex = 0; byteKeyIndex < keyLength; byteKeyIndex += 1) {
        const encryptedByteChunks = byteKeyIndexToEncryptedByteChunks.get(byteKeyIndex);
        const candidateKeyForCurrentChunk = bruteForceDecryptXORSingleCharCipher(encryptedByteChunks);
        candidateChunkKeys.push(candidateKeyForCurrentChunk.key);
    }

    // decrypt by repeating XOR back the key bytes with the encrypted bytes
    let decryptedMessage = '';
    let byteKeyIndex = 0;
    for (let encryptedByteArrIndex = 0; encryptedByteArrIndex < encryptedByteArr.length; encryptedByteArrIndex++) {
        const decryptedByte = encryptedByteArr[encryptedByteArrIndex] ^ candidateChunkKeys[byteKeyIndex].charCodeAt(0);

        decryptedMessage += String.fromCharCode(decryptedByte);

        byteKeyIndex += 1;
        if (byteKeyIndex >= candidateChunkKeys.length) {
            byteKeyIndex = 0;
        }
    }

    return decryptedMessage;
}