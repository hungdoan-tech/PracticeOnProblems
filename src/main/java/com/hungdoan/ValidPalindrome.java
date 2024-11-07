package com.hungdoan;

//A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters,
// it reads the same forward and backward. Alphanumeric characters include letters and numbers.
//
//Given a string s, return true if it is a palindrome, or false otherwise.
//
//
//
//Example 1:
//
//Input: s = "A man, a plan, a canal: Panama"
//Output: true
//Explanation: "amanaplanacanalpanama" is a palindrome.
//Example 2:
//
//Input: s = "race a car"
//Output: false
//Explanation: "raceacar" is not a palindrome.
//Example 3:
//
//Input: s = " "
//Output: true
//Explanation: s is an empty string "" after removing non-alphanumeric characters.
//Since an empty string reads the same forward and backward, it is a palindrome.
//
//
//Constraints:
//
//1 <= s.length <= 2 * 105
//s consists only of printable ASCII characters.
//https://en.wikipedia.org/wiki/Palindrome
public class ValidPalindrome {

    public static void main(String[] args) {
        String input = "A man, a plan, a canal: Panama";
        input = "0P";
        ValidPalindrome instance = new ValidPalindrome();
        boolean palindrome = instance.isPalindrome(input);
        System.out.println(palindrome);
    }

    public boolean isPalindrome(String s) {
        if (s.length() < 2) {
            return true;
        }

        int left = 0;
        int right = s.length() - 1;

        while (left < right) {

            char leftChar = s.charAt(left);
            if (!isAlphanumeric(leftChar)) {
                left++;
                continue;
            }

            char rightChar = s.charAt(right);
            if (!isAlphanumeric(rightChar)) {
                right--;
                continue;
            }

            if (!isEqualIgnoreCase(leftChar, rightChar)) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

    private boolean isAlphanumeric(char c) {
        return (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
    }

    private boolean isNumeric(char c) {
        return c >= '0' && c <= '9';
    }

    private boolean isEqualIgnoreCase(char c1, char c2) {

        if (isNumeric(c1) || isNumeric(c2)) {
            return c1 == c2;
        }

        return c1 == c2 || c1 == c2 + 32 || c1 == c2 - 32;
    }
}

