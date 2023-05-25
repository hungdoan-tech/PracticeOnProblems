package com.hungdoan;

import java.util.HashSet;
import java.util.Set;

public class LongestPalindrome {

    public static void main(String[] args) {
        String s = "abccccdd";
        System.out.println(longestPalindrome(s));
    }

    /**
     * Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
     * <p>
     * Letters are case sensitive, for example, "Aa" is not considered a palindrome here.
     *
     * @param s
     * @return
     */
    public static int longestPalindrome(String s) {
        char[] chars = s.toCharArray();
        Set<Character> set = new HashSet<>();
        int counting = 0;

        for (char element : chars) {

            if (set.contains(element)) {
                set.remove(element);
                counting = counting + 2;
                continue;
            }

            set.add(element);
        }

        if (set.isEmpty() == false) {
            counting++;
        }
        return counting;
    }
}
