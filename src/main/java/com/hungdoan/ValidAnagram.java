package com.hungdoan;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ValidAnagram {

    public static void main(String[] args) {
        String s = "anagram", t = "nagaram";
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

        Map<Character, Integer> charctToCounting = new HashMap<>();
        for(int index = 0, length = s.length(); index < length; index++){

            Character charct = s.charAt(index);
            charctToCounting.put(charct,
                                 charctToCounting.getOrDefault(charct, 0) + 1);
        }

        for(int index = 0, length = s.length(); index < length; index++) {

            Character charct = t.charAt(index);
            Integer countingOfChart = charctToCounting.get(charct);
            if(countingOfChart == null){
                return false;
            }

            if (countingOfChart > 1) {

                charctToCounting.put(charct,
                                     countingOfChart - 1);
                continue;
            }

            charctToCounting.remove(charct);
        }

        if(charctToCounting.isEmpty()){
            return true;
        }

        return false;
    }
}
