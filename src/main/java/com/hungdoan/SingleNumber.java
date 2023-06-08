package com.hungdoan;

public class SingleNumber {

    public static void main(String[] args) {
        int[] nums = {4, 1, 2, 1, 2};
        System.out.println(singleNumber(nums));
    }

    /**
     * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
     * <p>
     * You must implement a solution with a linear runtime complexity and use only constant extra space.
     * <p>
     * we use bitwise XOR to solve this problem :
     * <p>
     * first , we have to know the bitwise XOR in java
     * <p>
     * 0 ^ N = N
     * N ^ N = 0
     * <p>
     * So..... if N is the single number
     * <p>
     * N1 ^ N1 ^ N2 ^ N2 ^..............^ Nx ^ Nx ^ N
     * <p>
     * = (N1^N1) ^ (N2^N2) ^..............^ (Nx^Nx) ^ N
     * <p>
     * = 0 ^ 0 ^ ..........^ 0 ^ N
     * <p>
     * = N
     *
     * @param nums
     * @return
     */
    public static int singleNumber(int[] nums) {
        int ans = 0;
        for (int i = 0; i < nums.length; i++) {
            ans ^= nums[i];
        }
        return ans;
    }
}
