import { assertEquals, tests } from "../../javascript/TinyUTLib.js";
import { convertHexSequenceToBase64Sequence } from "./S01C01.js";
import { xorTwoHexMessages } from "./S01C02.js";
import { convertHexSequenceToByteArr, bruteForceDecryptXORSingleCharCipher } from "./S01C03.js";
import { findingClearMessageInFileHasBeenAppliedXORSingleCharCipher } from "./S01C04.js";
import { encryptByRepeatingKeyXORCipher, convertByteArrToHexSequence, convertUTF8SequenceToByteArr } from "./S01C05.js";
import { calculateHammingDistance } from "./S01C06.js";

tests({
    'S01C01_giveMessageInHex_convertToBase64_expectCorrectEncodeBase64Message': function () {
        const messageInHex = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
        const result = convertHexSequenceToBase64Sequence(messageInHex);

        assertEquals('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t', result);

        console.log(`From message in hex ${messageInHex} - we convert it to base64 as ${result}`);
    },

    'S01C02_give2MessageInHex_xorTheseTwoMessage_expectCorrectXORResult': function () {
        const firstBuffer = '1c0111001f010100061a024b53535009181c';
        const secondBuffer = '686974207468652062756c6c277320657965';
        const xorResult = xorTwoHexMessages(firstBuffer, secondBuffer);

        assertEquals('746865206b696420646f6e277420706c6179', xorResult);

        console.log(`From 2 messages in hex ${firstBuffer} and ${secondBuffer} - we XOR it and the result is ${xorResult}`);
    },

    "S01C03_giveHexadecimalSequences_bruteForceDecryptByXORSingleChar_expectCorrectDecryptedMessage": function () {
        const hexadecimalSequences = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
        const cipherByteArr = convertHexSequenceToByteArr(hexadecimalSequences);
        const { key, score, clearMessage } = bruteForceDecryptXORSingleCharCipher(cipherByteArr);

        assertEquals(`Cooking MC's like a pound of bacon`, clearMessage);

        console.log(`With the key = ${key}, we output with prmomising score ${score}\nThe most likely clear message would be : ${clearMessage}`);
    },

    "S01C04_giveAFileContainAllPossibleEncryptedMessage_bruteForceDecryptByXORSingleCharAllLines_expectCorrectDecryptedMessage": async function () {
        const { key, score, clearMessage, encryptedMessage } = await findingClearMessageInFileHasBeenAppliedXORSingleCharCipher("./src/main/cryptopal/Set01/S01C04.txt");

        assertEquals(`Now that the party is jumping\n`, clearMessage);

        console.log(`With the key = ${key} - Score = ${score}\nFrom Encrypted Message: ${encryptedMessage} to Clear Message : ${clearMessage}`);
    },

    'S01C05_giveUTF16CharsClearMessageAndKey_encryptUsingSimpleCipherRepeatingKeyXOR_expectCorrectEncryptedMessage': function () {
        const clearMessage = `Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal`;
        const key = 'ICE';
        const encryptedMessageByteArr = encryptByRepeatingKeyXORCipher(clearMessage, key);
        const encryptedMessage = convertByteArrToHexSequence(encryptedMessageByteArr);

        assertEquals('0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f', encryptedMessage);

        console.log(`Fromt the clear message: ${clearMessage}
        \nEncrypt it with the repeating XOR key approach - key = ${key}
        \nThe encrypt message in hex would be ${encryptedMessage}`);
    },

    'S01C06_giveTwoUTF8Strings_calculateHammingDistance_expectCorrectDistance': function () {
        const firstMessageByteArr = convertUTF8SequenceToByteArr('this is a test');
        const secondMessageByteArr = convertUTF8SequenceToByteArr('wokka wokka!!!');
        const hammingDistance = calculateHammingDistance(firstMessageByteArr, secondMessageByteArr);

        assertEquals(37, hammingDistance);
    },


    'S01C06_giveFileContainBase64Sequence_decryptByRepeatingKeyCipher_expectCorrectClearMessage': function () {

    },
});