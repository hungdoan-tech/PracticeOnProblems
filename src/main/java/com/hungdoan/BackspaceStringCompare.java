package com.hungdoan;

import java.util.Deque;
import java.util.LinkedList;

public class BackspaceStringCompare {

    public static void main(String[] args) {
        String s = "y#fo##f", t = "y#f#o##f";
        System.out.println(backspaceCompare(s, t));
    }

    /**
     * Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
     * <p>
     * Note that after backspacing an empty text, the text will continue empty.
     *
     * @param s
     * @param t
     * @return
     */
    public static boolean backspaceCompare(String s, String t) {
        s = filterBackspaceInString(s);
        t = filterBackspaceInString(t);
        return s.equals(t);
    }

    private static String filterBackspaceInString(String str) {
        Deque<Character> stack = new LinkedList<>();
        for (int i = 0, length = str.length(); i < length; i++) {
            char aChar = str.charAt(i);
            if (aChar == '#') {
                if (stack.isEmpty() == false) {
                    stack.removeFirst();
                }
                continue;
            }
            stack.addFirst(aChar);
        }
        return stack.toString();
    }
}
