package com.hungdoan;

import java.util.HashMap;
import java.util.Map;

public class TwoSum {

    public static void main(String[] args) {

        int[] nums = new int[]{2,7,11,15};
        int target = 22;
        TwoSum twoSumInstance = new TwoSum();
        int[] output = twoSumInstance.twoSum(nums, target);
        for(int num : output){
            System.out.print(num);
            System.out.print(" ");
        }
    }

    /**
     * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target
     * You may assume that each input would have exactly one solution, and you may not use the same element twice
     *
     * @param nums
     * @param target
     * @return
     */
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> remainToIndex = new HashMap<>();
        for (int currentIndex = 0, length = nums.length; currentIndex < length; currentIndex++){

            int currentNum = nums[currentIndex];
            int remainNum = target - currentNum;

            if(remainToIndex.get(remainNum) != null){
                int remainIndex = remainToIndex.get(remainNum);
                return new int[]{remainIndex, currentIndex};
            }
            else {
                remainToIndex.put(currentNum, currentIndex);
            }
        }
        return new int[]{-1, -1};
    }
}
