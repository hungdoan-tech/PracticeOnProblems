package com.hungdoan;

import java.util.HashMap;
import java.util.Map;

public class OddOccurrencesInArray {

    public int solution(int[] A) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int num : A) {
            if (map.get(num) == null) {
                map.put(num, 1);
                continue;
            }
            map.put(num, map.get(num) + 1);
        }

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if (entry.getValue() == 1) {
                return entry.getKey();
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] arr = new int[]{9, 3, 9, 3, 9, 7, 9};
        OddOccurrencesInArray oddOccurrencesInArray = new OddOccurrencesInArray();
        int solution = oddOccurrencesInArray.solution(arr);
        System.out.println(solution);
    }
}
