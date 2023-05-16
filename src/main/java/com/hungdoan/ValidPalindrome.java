package com.hungdoan;

import java.util.Stack;

public class ValidPalindrome {

    public static void main(String[] args) {
        String input = "A man, a plan, a canal: Panama";
        System.out.println(isPalindrome(input));
    }

    /**
     * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same
     * forward and backward. Alphanumeric characters include letters and numbers.
     *
     * Given a string s, return true if it is a palindrome, or false otherwise.
     *
     * @param s
     * @return
     */
    public static boolean isPalindrome(String s) {
        if (s.isEmpty()){
            return false;
        }

        char[] chars = s.toCharArray();
        int left = 0;
        int right = chars.length - 1;

        for(;left < right;){

            if(Character.isLetterOrDigit(chars[left]) == false){
                left++;
                continue;
            }

            if(Character.isLetterOrDigit(chars[right]) == false){
                right--;
                continue;
            }

            if(Character.toLowerCase(chars[left]) != Character.toLowerCase(chars[right])){
                return false;
            }

            // equal -> match the left value and right value
            left++;
            right--;
        }

        return true;
    }
}
