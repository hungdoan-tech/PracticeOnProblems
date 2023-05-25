package com.hungdoan;

import java.util.LinkedList;

public class ClimbingStairs {

    public static void main(String[] args) {
        System.out.println(climbStairs(35));
    }

    /**
     * You are climbing a staircase. It takes n steps to reach the top.
     * <p>
     * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
     *
     * @param n
     * @return
     */
    public static int climbStairs(int n) {
        climb(0, n);
        return allPaths.size();
    }

    private static LinkedList<Integer> currentList = new LinkedList<>();

    private static LinkedList<LinkedList<Integer>> allPaths = new LinkedList<>();

    private static void climb(int currentStep, int destination) {

        currentStep = currentStep + 1;
        currentList.addLast(1);
        if (currentStep == destination) {
            allPaths.addLast((LinkedList<Integer>) currentList.clone());
            currentList.removeLast();
            return;
        } else if (currentStep < destination) {
            climb(currentStep, destination);
        }
        currentStep = currentStep - 1;
        currentList.removeLast();

        currentStep = currentStep + 2;
        currentList.addLast(2);
        if (currentStep == destination) {
            allPaths.addLast((LinkedList<Integer>) currentList.clone());
            currentList.removeLast();
            return;
        } else if (currentStep < destination) {
            climb(currentStep, destination);
        }
        currentStep = currentStep - 2;
        currentList.removeLast();
    }
}
