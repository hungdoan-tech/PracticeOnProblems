package com.hungdoan;

import java.util.Arrays;

public class AGroupOfFriendsIsGoingOnHolidayTogether {

    public static void main(String[] args) {
        int solution = solution(new int[]{2, 3, 4, 2}, new int[]{2, 5, 7, 2});
        System.out.println(solution);

        solution = solution(new int[]{1, 4, 1}, new int[]{1, 5, 1});
        System.out.println(solution);

        solution = solution(new int[]{4, 4, 2, 4}, new int[]{5, 5, 2, 5});
        System.out.println(solution);
    }

    private static int solution(int[] p, int[] s) {

        int totalPassenger = 0;
        for (Integer passenger : p) {
            totalPassenger += passenger;
        }

        Arrays.sort(s);

        int totalNeededCar = 0;
        for (int i = s.length - 1; i >= 0; i--) {
            int seat = s[i];

            totalPassenger -= seat;

            if (totalPassenger <= 0) {
                totalNeededCar++;
                break;
            }

            totalNeededCar++;
        }

        return totalNeededCar;
    }
}
