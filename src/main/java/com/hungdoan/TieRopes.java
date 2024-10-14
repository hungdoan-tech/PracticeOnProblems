package com.hungdoan;

public class TieRopes {

    public static int solution(int K, int[] A) {
        int ties = 0;
        int tieLength = 0;

        for (int i = 0; i < A.length; i++) {
            tieLength += A[i];

            // Whenever the length meets or exceeds K, a tie is formed
            if (tieLength >= K) {
                ties++;
                tieLength = 0;  // Reset for the next tie
            }
        }

        return ties;
    }


    public static void main(String[] args) {
        int[] A = new int[]{1, 2, 3, 4, 1, 1, 3};
        int K = 4;
        int solution = solution(K, A);
        System.out.println(solution);
    }
}
