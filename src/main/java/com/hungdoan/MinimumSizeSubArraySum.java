package com.hungdoan;

public class MinimumSizeSubArraySum {

    public int minSubArrayLen(int target, int[] nums) {

        int left = 0;

        int sum = 0;

        int min = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {

            sum += nums[right];

            while (sum >= target) {

                if (right + 1 - left < min) {
                    min = right + 1 - left;
                }

                sum -= nums[left];
                left++;
            }
        }

        return min == Integer.MAX_VALUE ? 0 : min;
    }

    public static void main(String[] args) {
        MinimumSizeSubArraySum instance = new MinimumSizeSubArraySum();

        int[] arr = new int[]{2, 3, 1, 2, 4, 3};
        int k = 7;

        arr = new int[]{1, 4, 4};
        k = 4;

        arr = new int[]{1, 1, 1, 1, 1, 1, 1, 1};
        k = 11;

        int result = instance.minSubArrayLen(k, arr);
        System.out.println(result);
    }
}
