package com.hungdoan;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class FixPlotHoleInARoad {

    public static void main(String[] args) {
        String s = "...xxx..x....xxx.";
        int b = 7;
        int solution = solution2(s, b);
        System.out.println(solution);

        s = "..xxxxx";
        b = 4;
        solution = solution2(s, b);
        System.out.println(solution);

        s = "x.x.xxx...x";
        b = 14;
        solution = solution2(s, b);
        System.out.println(solution);

        s = "..";
        b = 5;
        solution = solution2(s, b);
        System.out.println(solution);
    }

    private static int solution(String s, int b) {
        s = s + ".";
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

    public static int solution2(String road, int budget) {
        road += ".";
        int n = road.length();
        int[] cnt = new int[n];
        int k = 0;

        for (char c : road.toCharArray()) {

            if (c == 'x') {
                ++k;
                continue;
            }

            if (k > 0) {
                ++cnt[k];
                k = 0;
            }
        }

        int ans = 0;
        for (k = n - 1; k > 0 && budget > 0; k--) {
            if (cnt[k] == 0) {
                continue;
            }

            int t = Math.min(budget / (k + 1), cnt[k]);
            ans += t * k;
            budget -= t * (k + 1);
            cnt[k - 1] += cnt[k] - t;  //shrink into the smaller group
        }

        return ans;
    }
}
