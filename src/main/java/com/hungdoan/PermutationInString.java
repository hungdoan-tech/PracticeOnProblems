package com.hungdoan;

import java.util.HashMap;
import java.util.Map;

public class PermutationInString {

    public boolean checkInclusion(String s1, String s2) {

        Map<Character, Integer> charToFreq = new HashMap<>();
        for (char currentChar : s1.toCharArray()) {
            charToFreq.putIfAbsent(currentChar, 0);
            charToFreq.put(currentChar, charToFreq.get(currentChar) + 1);
        }


        int left = 0;
        boolean facingSeq = false;
        for (int right = 0; right < s2.length(); right++) {

            char currentChar = s2.charAt(right);

            if (charToFreq.containsKey(currentChar)) {
                
                facingSeq = true;

                charToFreq.put(currentChar, charToFreq.get(currentChar) - 1);

                if (isEmptyMap(charToFreq)) {
                    return true;
                }
            }

            if (!facingSeq) {
                left = right + 1;
                charToFreq = new HashMap<>(charToFreq);
                facingSeq = false;
                continue;
            }

            Character startChar = s2.charAt(left);
            while (charToFreq.get(startChar) == 0) {
                charToFreq.putIfAbsent(currentChar, 0);
                charToFreq.put(currentChar, charToFreq.get(currentChar) + 1);
                left++;
            }
        }

        return false;
    }

    private boolean isEmptyMap(Map<Character, Integer> map) {
        for (Map.Entry<Character, Integer> entry : map.entrySet()) {
            if (entry.getValue() != 0) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        PermutationInString instance = new PermutationInString();
        String s1 = "ab";
        String s2 = "eidboaoo";

        s1 = "ab";
        s2 = "eidbaooo";

        s1 = "adc";
        s2 = "dcda";
        boolean b = instance.checkInclusion(s1, s2);
        System.out.println(b);
    }
}
