// Single-byte XOR cipher
// The hex encoded string:

// 1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736
// ... has been XOR'd against a single character. Find the key, decrypt the message.

// You can do this by hand. But don't: write code to do it for you.

// How? Devise some method for "scoring" a piece of English plaintext. Character frequency is a good metric. Evaluate each output and choose the one with the best score.

function decryptXORSingleCharCipher(hexadecimalSequences) {

    const CHARACTER_FREQ = {
        'a': 0.0651738, 'b': 0.0124248, 'c': 0.0217339, 'd': 0.0349835, 'e': 0.1041442, 'f': 0.0197881, 'g': 0.0158610,
        'h': 0.0492888, 'i': 0.0558094, 'j': 0.0009033, 'k': 0.0050529, 'l': 0.0331490, 'm': 0.0202124, 'n': 0.0564513,
        'o': 0.0596302, 'p': 0.0137645, 'q': 0.0008606, 'r': 0.0497563, 's': 0.0515760, 't': 0.0729357, 'u': 0.0225134,
        'v': 0.0082903, 'w': 0.0171272, 'x': 0.0013692, 'y': 0.0145984, 'z': 0.0007836, ' ': 0.1918182
    }

    function calculateEngFrequencyScore(clearCandidateByteArr) {
        let candidateScore = 0;
        let candidateMessage = ''

        for (let index = 0; index < clearCandidateByteArr.length; index++) {
            const currentCharacter = String.fromCharCode(clearCandidateByteArr[index])
            candidateMessage += currentCharacter
            candidateScore += CHARACTER_FREQ[currentCharacter.toLowerCase()] || 0;
        }

        return {
            candidateScore,
            candidateMessage
        };
    }

    function XORBackToFindOriginalBytes(cipherByteArr, candidateKeyByte) {
        let clearCandidateByteArr = new Uint8Array(cipherByteArr.length)

        for (let index = 0; index < cipherByteArr.length; index++) {
            clearCandidateByteArr[index] = cipherByteArr[index] ^ candidateKeyByte
        }

        return clearCandidateByteArr
    }

    function bruteForceDecryptByXORSingleChar(cipherByteArr) {
        let finalDecyptedResult = {
            key: -1,
            score: -1,
            clearMessage: ''
        };

        for(let candidateKeyByte = 0; candidateKeyByte < Math.pow(2, 8); candidateKeyByte++){
            const clearCandidateByteArr = XORBackToFindOriginalBytes(cipherByteArr, candidateKeyByte)
            const { candidateScore, candidateMessage } = calculateEngFrequencyScore(clearCandidateByteArr)

            if (candidateScore > finalDecyptedResult.score) {
                finalDecyptedResult = {
                    key: String.fromCharCode(candidateKeyByte),
                    score: candidateScore,
                    clearMessage: candidateMessage
                };
            }
        }

        return finalDecyptedResult;
    }

    function convertHexSequenceToByteArray(hexSequences){
        const charArr = hexSequences.split('')
        const byteArr = new Uint8Array(charArr.length / 2)
        for (let i = 0; i < charArr.length; i += 2) {
            let bits = parseInt(charArr[i], 16)
            byteArr[i / 2] = bits << 4 | parseInt(charArr[i + 1], 16)
        }
        return byteArr
    }

    const cipherByteArr = convertHexSequenceToByteArray(hexadecimalSequences)
    const mostLikelyClearCandidate = bruteForceDecryptByXORSingleChar(cipherByteArr)
    return mostLikelyClearCandidate
}

const {key, score, clearMessage} = decryptXORSingleCharCipher('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736')
console.log(`With the key ${key}, we output with prmomising score ${score} \n The most likely clear message would be : ${clearMessage}`)