package com.hungdoan;

public class MaxNonoverlappingSegments {

    public int solution(int[] A, int[] B) {
        int max = 0;

        int index = 0;

        while (index < A.length) {
            int segmentsLength = findAtIndex(A, B, index);

            if (segmentsLength > max) {
                max = segmentsLength;
            }

            index++;
        }

        return max;
    }

    public int findAtIndex(int[] A, int[] B, int currentIndex) {
        int length = 0;

        int endCurrentSegment = B[currentIndex];

        int startSegmentIndex = currentIndex + 1;

        while (startSegmentIndex < A.length) {

            if (A[startSegmentIndex] >= endCurrentSegment) {
                endCurrentSegment = B[startSegmentIndex];
                length++;
                startSegmentIndex++;
                continue;
            }

            startSegmentIndex++;
        }

        return length;
    }

    public static void main(String[] args) {
        MaxNonoverlappingSegments instance = new MaxNonoverlappingSegments();
        int[] A = new int[]{1, 3, 7, 9, 9};
        int[] B = new int[]{5, 6, 8, 9, 10};
        int solution = instance.solution(A, B);
        System.out.println(solution);
    }
}
