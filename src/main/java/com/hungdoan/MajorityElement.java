package com.hungdoan;

import java.util.HashMap;

public class MajorityElement {

    public static void main(String[] args) {
        int[] nums = {2, 2, 1, 1, 1, 2, 2};
        System.out.println(majorityElement(nums));
    }

    public static int majorityElement(int[] nums) {

        final int threshold = nums.length / 2;
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int num : nums) {

            Integer countingOfNum = map.get(num);

            if (countingOfNum == null) {
                map.put(num, 1);
                continue;
            }

            if (countingOfNum + 1 > threshold) {
                return num;
            }

            map.put(num, countingOfNum + 1);
        }

        return 0;
    }
}
