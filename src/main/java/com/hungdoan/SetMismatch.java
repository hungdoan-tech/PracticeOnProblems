package com.hungdoan;

public class SetMismatch {

    public static void main(String[] args) {
        int[] nums = {1, 2, 2, 4};
        for (int num : findErrorNums(nums)) {
            System.out.print(num);
        }
    }

    /**
     * You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.
     * <p>
     * You are given an integer array nums representing the data status of this set after the error.
     * <p>
     * Find the number that occurs twice and the number that is missing and return them in the form of an array.
     *
     * @param nums
     * @return
     */
    public static int[] findErrorNums(int[] nums) {

        int[] check = new int[nums.length + 1];
        int twiceNum = 0;
        int missingNum = 0;

        for (int num : nums) {

            if (check[num] == 0) {
                check[num] = 1;
            } else {
                twiceNum = num;
            }
        }

        for (int i = 1; i < check.length; i++) {
            if (check[i] == 0) {
                missingNum = i;
            }
        }

        return new int[]{twiceNum, missingNum};
    }
}
