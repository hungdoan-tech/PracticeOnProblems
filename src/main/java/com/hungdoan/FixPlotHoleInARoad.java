package com.hungdoan;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class FixPlotHoleInARoad {

    public static void main(String[] args) {
        String s = "...xxx..x....xxx.";
        int b = 7;
        int solution = solution(s, b);
        System.out.println(solution);

        s = "..xxxxx";
        b = 4;
        solution = solution(s, b);
        System.out.println(solution);

        s = "x.x.xxx...x";
        b = 14;
        solution = solution(s, b);
        System.out.println(solution);

        s = "..";
        b = 5;
        solution = solution(s, b);
        System.out.println(solution);
    }

    private static int solution(String s, int b) {

        char[] charArray = s.toCharArray();

        List<Integer> plotHoles = new LinkedList<>();

        int plotHoleLength = 0;

        for (char segment : charArray) {

            if (segment == 'x') {
                plotHoleLength++;
                continue;
            }

            if (plotHoleLength > 0) {
                plotHoles.add(plotHoleLength);
            }
            plotHoleLength = 0;
        }

        if (charArray[charArray.length - 1] == 'x') {
            plotHoles.add(plotHoleLength);
        }

        int fixedHole = 0;

        Collections.sort(plotHoles);

        for (int i = plotHoles.size() - 1; i >= 0; i--) {

            Integer plotHole = plotHoles.get(i);
            int temp = b - plotHole - 1;

            while (temp < 0) {
                plotHole--;
                temp = b - plotHole - 1;
            }

            b = temp;
            fixedHole += plotHole;

            if (b == 0) {
                break;
            }
        }

        return fixedHole;
    }
}
