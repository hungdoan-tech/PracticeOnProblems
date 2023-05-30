package com.hungdoan;

import java.util.HashSet;
import java.util.Set;

public class ContainDuplicate {

    /**
     * Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
     *
     * @param nums
     * @return
     */
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> uniqueNums = new HashSet<>();
        for (int num : nums) {
            if (uniqueNums.contains(num) == false) {
                uniqueNums.add(num);
            } else {
                return true;
            }
        }
        return false;
    }
}
