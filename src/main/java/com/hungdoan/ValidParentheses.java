package com.hungdoan;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class ValidParentheses {

    public static void main(String[] args) {
        String input = "([)]";
        System.out.println(isValid(input));
    }

    /**
     * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
     *
     * An input string is valid if:
     *
     * Open brackets must be closed by the same type of brackets.
     * Open brackets must be closed in the correct order.
     * Every close bracket has a corresponding open bracket of the same type.
     *
     * @param s
     * @return
     */
    public static boolean isValid(String s) {
        Map<Character, Character> validChars = new HashMap<>();
        validChars.put('(', ')');
        validChars.put('{', '}');
        validChars.put('[', ']');

        char[] inputChars = s.toCharArray();
        if(inputChars.length % 2 != 0){
            return false;
        }

        Stack<Character> stack = new Stack<>();
        for (int index=0; index < inputChars.length; index++){

            char currentChar = inputChars[index];
            if(currentChar == '(' || currentChar== '{' || currentChar == '['){
                stack.push(currentChar);
                continue;
            }

            if (stack.isEmpty()){
                //don't have any open char in existing stack - wrong case
                return false;
            }
            Character previousChar = stack.peek();
            if(previousChar != null
                    && validChars.get(previousChar) != null
                    && validChars.get(previousChar).equals(currentChar)){
                stack.pop();
            } else {
                // Can not match the suitable pair between the latest char and the current char - wrong case
                return false;
            }
        }

        return stack.isEmpty();
    }
}
