// One of the 60-character strings in this file S01C04.txt has been encrypted by single-character XOR.
// Find it.
import { convertHexSequenceToByteArr, bruteForceDecryptXORSingleCharCipher } from "./S01C03.js";
import fs from 'fs';

export async function getTextLinesInFile(filePath) {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    return data.split('\r\n');
}

export async function findingClearMessageInFileHasBeenAppliedXORSingleCharCipher(filePath) {
    const lines = await getTextLinesInFile(filePath);

    let finalResult = {
        key: -1,
        score: -1,
        clearMessage: '',
        encryptedMessage: ''
    };

    for (let index = 0; index < lines.length; index++) {
        const cipherByteArr = convertHexSequenceToByteArr(lines[index]);
        const { key, score, clearMessage } = bruteForceDecryptXORSingleCharCipher(cipherByteArr);
        if (score > finalResult.score) {
            finalResult = { key, score, clearMessage, encryptedMessage: lines[index] };
        }
    }

    return finalResult;
}