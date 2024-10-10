package com.hungdoan;

import java.util.HashSet;
import java.util.Set;

public class HappyNumber {

    public boolean isHappy(int n) {
        Set<Integer> repeatedNumbers = new HashSet<>();
        repeatedNumbers.add(n);
        while (n > 1) {

            n = calculate(n);

            if (repeatedNumbers.contains(n)) {
                return false;
            }

            repeatedNumbers.add(n);
        }

        return true;
    }

    public boolean isHappy2(int n) {

        int slow = n;
        int fast = n;

        do {
            slow = calculate(slow);
            fast = calculate(calculate(fast));
        } while (slow != fast);

        return slow == 1;
    }

    private int calculate(int n) {

        int sum = 0;

        while (n > 0) {

            int num = n % 10;

            sum = sum + num * num;

            n = n / 10;
        }

        return sum;
    }

    public static void main(String[] args) {
        HappyNumber happyNumber = new HappyNumber();
        boolean isHappy = happyNumber.isHappy2(19);
        System.out.println(isHappy);

    }
}
