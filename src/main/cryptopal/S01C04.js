// One of the 60-character strings in this file S01C04.txt has been encrypted by single-character XOR.
// Find it.
import { assertEquals, tests } from "../javascript/TinyUTLib.js";
import { convertHexSequenceToByteArray, bruteForceDecryptByXORSingleChar } from "./S01C03.js";
import fs from 'fs';

export async function getTextLinesInFile(filePath) {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    return data.split('\r\n');
}

async function findingXORSingleCharInFiles(filePath) {
    const lines = await getTextLinesInFile(filePath);

    let finalResult = {
        key: -1,
        score: -1,
        clearMessage: '',
        encryptedMessage: ''
    };

    for (let index = 0; index < lines.length; index++) {
        const cipherByteArr = convertHexSequenceToByteArray(lines[index]);
        const { key, score, clearMessage } = bruteForceDecryptByXORSingleChar(cipherByteArr);
        if (score > finalResult.score) {
            finalResult = { key, score, clearMessage, encryptedMessage: lines[index] };
        }
    }

    return finalResult;
}

function perform() {
    tests({
        "giveAFileContainAllPossibleEncryptedMessage_bruteForceDecryptByXORSingleCharAllLines_expectCorrectDecryptedMessage": async function () {
            const { key, score, clearMessage, encryptedMessage } = await findingXORSingleCharInFiles("./src/main/cryptopal/S01C04.txt");
            assertEquals(`Now that the party is jumping\n`, clearMessage);
            console.log(`With key ${key} - Score ${score}\nFrom Cipher Message: ${encryptedMessage} to Clear Message : ${clearMessage}`);
        }
    });
}