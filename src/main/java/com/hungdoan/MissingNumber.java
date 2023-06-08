package com.hungdoan;

public class MissingNumber {

    public static void main(String[] args) {
        int[] nums = {9, 6, 4, 2, 3, 5, 7, 0, 1};
        System.out.println(missingNumber(nums));
    }

    /**
     * Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
     *
     * @param nums
     * @return
     */
    public static int missingNumber(int[] nums) {
        int[] check = new int[nums.length + 1];
        int missingNum = 0;

        for (int num : nums) {

            if (check[num] == 0) {
                check[num] = 1;
            }
        }

        for (int i = 0; i < check.length; i++) {
            if (check[i] == 0) {
                missingNum = i;
            }
        }

        return missingNum;
    }
}
