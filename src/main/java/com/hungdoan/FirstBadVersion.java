package com.hungdoan;

public class FirstBadVersion {

    private static int badVersionIndex;

    /**
     * You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check.
     * Since each version is developed based on the previous version, all the versions after a bad version are also bad.
     * <p>
     * Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
     * <p>
     * You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should
     * minimize the number of calls to the API.
     *
     * @param n
     * @return
     */
    public static int firstBadVersion(int n) {
        return performSearch(0, n);
    }

    private static int performSearch(int leftIndex, int rightIndex) {

        if (leftIndex > rightIndex) {
            return -1;
        }

        int middleIndex = leftIndex + ((rightIndex - leftIndex) / 2);

        if (isValid(middleIndex)) {
            return middleIndex;
        }

        if (isBad(middleIndex)) {
            return performSearch(leftIndex, middleIndex - 1);
        }

        return performSearch(middleIndex + 1, rightIndex);
    }

    private static boolean isValid(int index) {
        if (index == 0 && isBadVersion(index)) {
            return true;
        }

        if (isBadVersion(index - 1) == false && isBadVersion(index)) {
            return true;
        }

        return false;
    }

    private static boolean isBad(int index) {
        if (index == 0 && isBadVersion(index)) {
            return true;
        }

        if (isBadVersion(index - 1) && isBadVersion(index)) {
            return true;
        }

        return false;
    }

    private static boolean isBadVersion(int index) {
        if (FirstBadVersion.badVersionIndex == index) {
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        int n = 5;
        FirstBadVersion.badVersionIndex = 4;
        System.out.println(firstBadVersion(n));
    }
}
