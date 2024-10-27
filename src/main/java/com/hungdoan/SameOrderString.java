package com.hungdoan;

public class SameOrderString {

    private boolean solution(String x, String y) {
        if (y.isEmpty()) {
            return true;
        }

        char[] charArrayX = x.toCharArray();
        char[] charArrayY = y.toCharArray();

        int index = 0;
        int count = 0;

        for (char charY : charArrayY) {
            while (index < x.length()) {
                char charX = charArrayX[index];

                if (charX == charY) {
                    count++;
                    index++;
                    break;
                }

                index++;
            }
        }

        return count == charArrayY.length;
    }

    private boolean solution2(String x, String y) {
        if (y.isEmpty()) {
            return true;
        }

        int j = 0;

        for (int i = 0; i < x.length(); i++) {
            if (x.charAt(i) == y.charAt(j)) {
                j++;
            }
            if (j == y.length()) {
                return true;
            }
        }

        return j == y.length();
    }

    public static void main(String[] args) {
        SameOrderString instance = new SameOrderString();
        boolean solution = instance.solution("babcdd", "bdd");
        System.out.println(solution);
    }
}
