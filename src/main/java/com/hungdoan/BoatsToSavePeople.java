package com.hungdoan;

import java.util.Arrays;

public class BoatsToSavePeople {

    public static int numRescueBoats(int[] people, int limit) {
        int boatCount = 0;
        Arrays.sort(people);

        int left = 0;
        int right = people.length - 1;

        while (left <= right) {

            int sum = people[left] + people[right];

            if (sum <= limit) {
                boatCount++;
                left++;
                right--;
                continue;
            }

            boatCount++;
            right--;
        }

        return boatCount;
    }

    public static int numRescueBoats2(int[] people, int limit) {
        int[] freq = new int[limit + 1];
        for (int weight : people) {
            freq[weight]++;
        }

        int boats = 0;
        int left = 0;
        int right = limit;
        while (left <= right) {

            while (left <= right && freq[left] == 0) {
                left++;
            }

            while (left <= right && freq[right] == 0) {
                right--;
            }

            if (left > right) {
                break;
            }

            boats++;
            freq[right]--;
            if (left + right <= limit) {
                freq[left]--;
            }
        }

        return boats;
    }

    public static void main(String[] args) {
        int[] arr = {2, 2};
        int limit = 6;
        int i = numRescueBoats2(arr, limit);
        System.out.println(i);
    }
}
