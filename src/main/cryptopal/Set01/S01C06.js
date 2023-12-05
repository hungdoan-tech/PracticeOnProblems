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
            differentBits += examinedBits & 0b0001;
            examinedBits = examinedBits >> 1;
        }
        hammingDistance += differentBits;
    }

    return hammingDistance;
}

function findKeySize(encryptedByteArr) {

    let result = {
        distance: Infinity,
        keySize: -1
    };

    for (let keySize = 2; keySize <= 40; keySize++) {

        let wholeCipherTextHammingDistance = 0;
        let start = 0;
        let end = start + keySize;

        let runner = 0;
        while (encryptedByteArr.length - end >= keySize) {
            const firstChunk = encryptedByteArr.slice(start, end);
            const secondChunk = encryptedByteArr.slice(end, end + keySize);

            const hammingDistance = calculateHammingDistance(firstChunk, secondChunk);
            const averageHammingDistancePerBytes = hammingDistance / keySize;

            wholeCipherTextHammingDistance += averageHammingDistancePerBytes;
            start = end + keySize;
            end = start + keySize;
            runner += 2;
        }

        wholeCipherTextHammingDistance /= runner;
        if (wholeCipherTextHammingDistance < result.distance) {
            result = {
                distance: wholeCipherTextHammingDistance,
                keySize
            };
        }
    }

    return result;
}


//const encryptedByteArr = repeatingKeyXOR('I would like to invite you to a party that is hosted by my wife !', 'key');

export async function getBase64CharsInFileAsByteArr(filePath) {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    let dataArr = data.replace('\r\n', '');
    dataArr = dataArr.split('');

    const result = new Uint8Array(dataArr.length);
    for (let index = 0; index < dataArr.length; index++) {
        const bits = dataArr[index].charCodeAt(0);
        result[index] = bits;
    }
    return result;
}

const encryptedByteArr = await getBase64CharsInFileAsByteArr('./src/main/cryptopal/S01C06.txt');
const abc = findKeySize(encryptedByteArr);
console.log(abc);