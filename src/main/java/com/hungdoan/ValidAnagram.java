package com.hungdoan;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ValidAnagram {

    public static void main(String[] args) {
        String s = "aa", t = "bb";
        System.out.println(isAnagram(s, t));
    }

    /**
     * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
     *
     * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
     *
     * @param s
     * @param t
     * @return
     */
    public static boolean isAnagram(String s, String t) {
        if(s.length() != t.length()){
            return false;
        }

        Set<Character> set = new HashSet<>();
        for(int index = 0, length = s.length(); index < length; index++){

            Character charct = s.charAt(index);
            set.add(charct);
        }

        for(int index = 0, length = s.length(); index < length; index++) {

            Character charct = t.charAt(index);
            set.remove(charct);
        }

        if(set.isEmpty()){
            return true;
        }

        return false;
    }
}
