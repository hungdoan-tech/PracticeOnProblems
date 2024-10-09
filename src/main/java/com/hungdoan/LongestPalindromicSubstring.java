package com.hungdoan;

//Given a string s, return the longest palindromic substring in s.
//
//Example 1:
//
//Input: s = "babad"
//Output: "bab"
//Explanation: "aba" is also a valid answer.
//Example 2:
//
//Input: s = "cbbd"
//Output: "bb"
//
//Constraints:
//
//1 <= s.length <= 1000
//s consist of only digits and English letters.
public class LongestPalindromicSubstring {

    private static String longestPalindrome(String s) {
        int maxLen = 0;
        String result = "";

        int current = 0;
        int length = s.length();

        while (current < length) {
            String oddPalindrome = check(s, current, current);
            if (oddPalindrome.length() > maxLen) {
                result = oddPalindrome;
                maxLen = oddPalindrome.length();
            }

            if (current < length - 1 && s.charAt(current) == s.charAt(current + 1)) {
                String evenPalindrome = check(s, current, current + 1);
                if (evenPalindrome.length() > maxLen) {
                    result = evenPalindrome;
                    maxLen = evenPalindrome.length();
                }
            }

            current++;
        }

        return result;
    }

    private static String check(String source, int left, int right) {
        while (left >= 0 && right < source.length() && source.charAt(left) == source.charAt(right)) {
            left--;
            right++;
        }

        return source.substring(left + 1, right);
    }


    public static void main(String[] args) {
        String result = longestPalindrome("cbbd");
        System.out.println(result);
    }
}
