package com.hungdoan;

import java.util.HashMap;
import java.util.Map;

public class RansomNote {

    public static void main(String[] args) {
        String ransomNote = "ab";
        String magazine = "aab";
        System.out.println(canConstruct(ransomNote, magazine));
    }

    /**
     * Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.
     * <p>
     * Each letter in magazine can only be used once in ransomNote.
     *
     * @param ransomNote
     * @param magazine
     * @return
     */
    public static boolean canConstruct(String ransomNote, String magazine) {

        Map<Character, Integer> charToCounting = new HashMap<>();

        char[] ransomNoteElements = ransomNote.toCharArray();
        for (Character element : ransomNoteElements) {
            charToCounting.put(element, charToCounting.getOrDefault(element, 0) + 1);
        }

        char[] magazineElements = magazine.toCharArray();
        for (Character element : magazineElements) {

            Integer countingPerChar = charToCounting.get(element);
            if (countingPerChar != null && countingPerChar > 1) {
                charToCounting.put(element, countingPerChar - 1);
            } else {
                charToCounting.remove(element);
            }
        }

        if (charToCounting.isEmpty()) {
            return true;
        }
        return false;
    }
}
