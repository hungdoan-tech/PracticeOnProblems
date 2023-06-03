package com.hungdoan;

public class LongestCommonPrefix {

    public static void main(String[] args) {
        String[] strs = {""};
        System.out.println(longestCommonPrefix(strs));
    }

    public static String longestCommonPrefix(String[] strs) {
        StringBuilder builder = new StringBuilder();

        int runner = 0;
        while (true) {

            Character eachStepChar = null;
            for (int index = 0; index < strs.length; index++) {

                if (runner >= strs[index].length()) {
                    return builder.toString();
                }

                char tempChar = strs[index].charAt(runner);

                if (eachStepChar == null) {
                    eachStepChar = tempChar;
                }

                if (eachStepChar.equals(tempChar) == false) {
                    return builder.toString();
                }
            }

            builder.append(strs[0].charAt(runner));
            runner++;
        }
    }
}
