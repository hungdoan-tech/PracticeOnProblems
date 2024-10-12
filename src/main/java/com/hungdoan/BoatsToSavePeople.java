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

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 6, 7};
        int limit = 8;
        int i = numRescueBoats(arr, limit);
        System.out.println(i);
    }
}
