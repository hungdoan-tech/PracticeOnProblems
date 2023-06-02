package com.hungdoan;

public class CountingBits {

    public static void main(String[] args) {
        System.out.println(counting1InBinaryFormOf(3));
    }

    /**
     * Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
     *
     * @param n
     * @return
     */
    public int[] countBits(int n) {
        int[] result = new int[n + 1];
        for (int i = 0; i < n + 1; i++) {
            result[i] = counting1InBinaryFormOf(i);
        }
        return result;
    }

    private static int counting1InBinaryFormOf(int num) {

        int numberOf1 = 0;
        int devideNumber = num;

        while (devideNumber > 0) {
            int remainder = devideNumber % 2;
            if (remainder == 1) {
                numberOf1++;
            }
            devideNumber = devideNumber / 2;
        }

        return numberOf1;
    }
}
