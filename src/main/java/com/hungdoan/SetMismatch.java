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

    /**
     * We calculate the sum of all numbers and the sum of squares. From it we subtract the actual sum.
     * If 'a' is repeated character and 'b' is missing.
     * We get sum = a-b and square_sum = a^2 - b^2.
     * using these equations we find a and b.
     *
     * @param nums
     * @return
     */
    public static int[] findErrorNums_BestSolution(int[] nums) {
        int sum = 0;
        int sqsum = 0;

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i] - (i + 1);
            sqsum += nums[i] * nums[i] - (i + 1) * (i + 1);
        }

        int diff = sum;
        sum = sqsum / sum;
        int a[] = new int[2];
        a[0] = (sum + diff) / 2;
        a[1] = (sum - a[0]);
        return a;
    }
}
