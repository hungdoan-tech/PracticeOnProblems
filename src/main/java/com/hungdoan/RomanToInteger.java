package com.hungdoan;

import java.util.HashMap;
import java.util.Map;

public class RomanToInteger {

    public static void main(String[] args) {
        String s = "MMCDXXV";
        System.out.println(romanToInt(s));
    }

    public static int romanToInt(String s) {

        Map<Object, Integer> prefixValues = new HashMap();
        prefixValues.put('I', 1);
        prefixValues.put('X', 10);
        prefixValues.put('C', 100);

        Map<Object, Integer> allAtomicValues = new HashMap();
        allAtomicValues.put('I', 1);
        allAtomicValues.put('V', 5);
        allAtomicValues.put('X', 10);
        allAtomicValues.put('L', 50);
        allAtomicValues.put('C', 100);
        allAtomicValues.put('D', 500);
        allAtomicValues.put('M', 1000);
        allAtomicValues.put("IV", 4);
        allAtomicValues.put("IX", 9);
        allAtomicValues.put("XL", 40);
        allAtomicValues.put("XC", 90);
        allAtomicValues.put("CD", 400);
        allAtomicValues.put("CM", 900);

        char[] chars = s.toCharArray();
        int finalResultInSystem10 = 0;
        for (int currentIndex = 0; currentIndex < chars.length; currentIndex++) {

            char aChar = chars[currentIndex];
            boolean isPrefixForSubtraction = prefixValues.get(aChar) != null;
            boolean isNotTail = currentIndex != chars.length - 1;
            Integer expectedContraction = isPrefixForSubtraction && isNotTail
                    ? allAtomicValues.get(s.substring(currentIndex, currentIndex + 2))
                    : null;

            if (expectedContraction != null) {
                finalResultInSystem10 += expectedContraction;
                currentIndex++;
                continue;
            }

            finalResultInSystem10 += allAtomicValues.get(aChar);
        }

        return finalResultInSystem10;
    }

    private static int anotherSolutionWithFasterRuntime(String s) {
        int result = 0;
        for (int i = 0; i < s.length(); i++) {
            switch (s.charAt(i)) {
                case 'M': {
                    if (i > 0 && s.charAt(i - 1) == 'C') result += 800;
                    else result += 1000;
                    break;
                }
                case 'D': {
                    if (i > 0 && s.charAt(i - 1) == 'C') result += 300;
                    else result += 500;
                    break;
                }
                case 'C': {
                    if (i > 0 && s.charAt(i - 1) == 'X') result += 80;
                    else result += 100;
                    break;
                }
                case 'L': {
                    if (i > 0 && s.charAt(i - 1) == 'X') result += 30;
                    else result += 50;
                    break;
                }
                case 'X': {
                    if (i > 0 && s.charAt(i - 1) == 'I') result += 8;
                    else result += 10;
                    break;
                }
                case 'V': {
                    if (i > 0 && s.charAt(i - 1) == 'I') result += 3;
                    else result += 5;
                    break;
                }
                case 'I': {
                    result += 1;
                    break;
                }
                default:
                    return 0;
            }
        }
        return result;
    }
}
