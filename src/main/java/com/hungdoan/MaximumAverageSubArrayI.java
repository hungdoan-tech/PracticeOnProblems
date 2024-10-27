package com.hungdoan;

public class MaximumAverageSubArrayI {

    public double findMaxAverage(int[] nums, int k) {
        if (nums.length == 1) {
            return nums[0];
        }

        if (k == 1) {
            int max = Integer.MIN_VALUE;
            for (int num : nums) {
                if (num > max) {
                    max = num;
                }
            }
            return max;
        }

        int left = 0;

        double sum = nums[0];

        double maxAvg = 0;

        for (int right = 1; right < nums.length; right++) {

            sum += nums[right];

            if (right + 1 - left == k) {

                if (sum / k > maxAvg) {
                    maxAvg = sum / k;
                }

                sum -= nums[left];
                left++;
            }
        }

        return maxAvg;
    }

    public double findMaxAverage2(int[] nums, int k) {
        if (nums.length == 1) {
            return nums[0];
        }

        if (k == 1) {
            int max = Integer.MIN_VALUE;
            for (int num : nums) {
                max = Math.max(max, num);
            }
            return max;
        }

        int left = 0;
        double sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }

        double maxAvg = sum / k;

        for (int right = k; right < nums.length; ) {
            sum += nums[right];
            sum -= nums[left];

            left++;
            right++;

            maxAvg = Math.max(maxAvg, sum / k);
        }

        return maxAvg;
    }


    public static void main(String[] args) {
        int[] arr = new int[]{1, 12, -5, -6, 50, 3};
        int k = 4;

        arr = new int[]{0, 4, 0, 3, 2};
        k = 1;

        MaximumAverageSubArrayI instance = new MaximumAverageSubArrayI();
        double maxAverage = instance.findMaxAverage(arr, k);
        System.out.println(maxAverage);
    }
}
