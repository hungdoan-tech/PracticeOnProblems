package com.hungdoan;


import java.util.HashMap;
import java.util.Map;

/**
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
 * <p>
 * Return the length of the longest substring containing the same letter you can get after performing the above operations.
 * <p>
 * <p>
 * <p>
 * Example 1:
 * <p>
 * Input: s = "ABAB", k = 2
 * Output: 4
 * Explanation: Replace the two 'A's with two 'B's or vice versa.
 * Example 2:
 * <p>
 * Input: s = "AABABBA", k = 1
 * Output: 4
 * Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
 * The substring "BBBB" has the longest repeating letters, which is 4.
 * There may exists other ways to achieve this answer too.
 * <p>
 * <p>
 * Constraints:
 * <p>
 * 1 <= s.length <= 105
 * s consists of only uppercase English letters.
 * 0 <= k <= s.length
 */
public class LongestRepeatingCharacterReplacement {

    public int characterReplacement(String s, int k) {
        if (s.length() < 2) {
            return s.length();
        }
        Map<Character, Integer> charToPreq = new HashMap<>();

        char[] chars = s.toCharArray();

        int left = 0;

        int right = 0;

        int result = 0;

        int maxFreq = 0;

        while (right < chars.length) {

            int slidingWindowLength = right + 1 - left;
            char currentChar = chars[right];

            charToPreq.putIfAbsent(currentChar, 0);
            charToPreq.put(currentChar, charToPreq.get(currentChar) + 1);

            if (charToPreq.get(currentChar) > maxFreq) {
                maxFreq = charToPreq.get(currentChar);
            }

            int replaceableSlots = slidingWindowLength - maxFreq;
            if (replaceableSlots <= k) {
                right++;

                if (right == chars.length) {
                    result = Math.max(result, slidingWindowLength);
                }
                continue;
            }

            result = Math.max(result, slidingWindowLength - 1);
            charToPreq.put(chars[left], charToPreq.get(chars[left]) - 1);
            left++;
            right++;
            maxFreq = findMaxFreq(charToPreq);
        }

        return result;
    }

    private int findMaxFreq(Map<Character, Integer> charToPreq) {
        int max = 0;
        for (Map.Entry<Character, Integer> entry : charToPreq.entrySet()) {
            if (entry.getValue() > max) {
                max = entry.getValue();
            }
        }
        return max;
    }

    public static void main(String[] args) {
        String s = "ABABBA";
        int k = 2;

        s = "ABAB";
        k = 2;

        s = "AABABBA";
        k = 1;

        LongestRepeatingCharacterReplacement instance = new LongestRepeatingCharacterReplacement();
        int i = instance.characterReplacement(s, k);
        System.out.println(i);
    }
}
