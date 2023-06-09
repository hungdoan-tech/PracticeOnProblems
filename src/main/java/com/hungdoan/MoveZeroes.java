package com.hungdoan;

public class MoveZeroes {

    public static void main(String[] args) {
        int[] nums = {0, 1, 0, 3, 12};
        moveZeroes(nums);
    }

    /**
     * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
     * <p>
     * Note that you must do this in-place without making a copy of the array.
     *
     * @param nums
     */
    public static void moveZeroes(int[] nums) {

        int nonZeroNumIndex = 0;
        for (int index = 0; index < nums.length; index++) {

            int currentNum = nums[index];
            if (currentNum != 0) {
                nums[nonZeroNumIndex++] = currentNum;
            }
        }

        int zeroNumIndex = nonZeroNumIndex;
        while (zeroNumIndex < nums.length) {
            nums[zeroNumIndex++] = 0;
        }
    }
}
