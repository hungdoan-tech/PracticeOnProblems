package com.hungdoan;

public class BinarySearch {

    public static void main(String[] args) {
        int[] nums = {-1, 0, 3, 5, 9, 12};
        System.out.println(search(nums, 2));
    }

    /**
     * Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.
     * <p>
     * You must write an algorithm with O(log n) runtime complexity.
     *
     * @param nums
     * @param target
     * @return
     */
    public static int search(int[] nums, int target) {
        return performSearch(nums, target, 0, nums.length - 1);
    }

    private static int performSearch(int[] nums, int target, int leftIndex, int rightIndex) {

        if (leftIndex > rightIndex) {
            return -1;
        }

        int middleIndex = leftIndex + ((rightIndex - leftIndex) / 2);

        if (target == nums[middleIndex]) {
            return middleIndex;
        }

        if (target < nums[middleIndex]) {
            return performSearch(nums, target, leftIndex, middleIndex - 1);
        }

        return performSearch(nums, target, middleIndex + 1, rightIndex);
    }
}
