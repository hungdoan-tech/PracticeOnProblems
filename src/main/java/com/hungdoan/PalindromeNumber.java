package com.hungdoan;

public class PalindromeNumber {

    public static void main(String[] args) {
        int num = 123;
        System.out.println(isPalindrome(num));
    }

    public static boolean isPalindrome(int x) {

        int originalNumber = x;
        int newNumber = 0;
        while (x > 0) {
            newNumber = newNumber * 10 + (x % 10);
            x = x / 10;
        }

        if (newNumber == originalNumber) {
            return true;
        }
        return false;
    }
}
