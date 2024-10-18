package com.hungdoan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class CourseSchedule {

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        Map<Integer, Integer> inDegree = new LinkedHashMap<>();
        Map<Integer, List<Integer>> graph = new HashMap<>();
        Queue<Integer> queue = new LinkedList<>();

        List<Integer> sortedList = new ArrayList<>();

        for (int i = 0; i < prerequisites.length; i++) {

            int[] prerequisite = prerequisites[i];
            int intendedToLearnCourse = prerequisite[0];

            inDegree.put(intendedToLearnCourse, 0);
            graph.put(intendedToLearnCourse, new LinkedList<>());
        }

        for (int i = 0; i < prerequisites.length; i++) {
            int[] prerequisite = prerequisites[i];
            int intendedToLearnCourse = prerequisite[0];
            int prerequisiteCourse = prerequisite[0];

            if (graph.get(prerequisiteCourse) == null) {
                continue;
            }
            graph.get(prerequisiteCourse).add(intendedToLearnCourse);
            inDegree.put(intendedToLearnCourse, inDegree.get(intendedToLearnCourse) + 1);
        }

        for (Map.Entry<Integer, Integer> entry : inDegree.entrySet()) {
            if (entry.getValue() == 0) {
                queue.add(entry.getKey());
            }
        }

        while (!queue.isEmpty()) {
            Integer node = queue.poll();
            sortedList.add(node);
            for (Integer neighbor : graph.get(node)) {
                inDegree.put(neighbor, inDegree.get(neighbor) - 1);
                if (inDegree.get(neighbor) == 0) {
                    queue.add(neighbor);
                }
            }
        }

        for (Integer degree : inDegree.values()) {
            if (degree > 0) {
                return false;
            }
        }
        return true;
    }

    public boolean canFinish2(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses + 1];

        for (int[] prerequisite : prerequisites) {
            int prerequisiteCourse = prerequisite[1];
            inDegree[prerequisiteCourse]++;
        }

        int length = prerequisites.length;
        boolean[] visited = new boolean[length];

        boolean flag = true;

        while (flag) {

            flag = false;

            for (int i = 0; i < length; i++) {

                int intendCourse = prerequisites[i][0];
                int prerequisiteCourse = prerequisites[i][1];

                if (!visited[i] && inDegree[intendCourse] == 0) {

                    visited[i] = true;
                    inDegree[prerequisiteCourse]--;
                    flag = true;
                }
            }
        }

        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] != 0) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        int numCourses = 3;
        int[][] prerequisites = new int[numCourses][];
        prerequisites[0] = new int[]{1, 0};
        prerequisites[1] = new int[]{2, 1};
        prerequisites[2] = new int[]{3, 2};

        CourseSchedule instance = new CourseSchedule();
        boolean result = instance.canFinish2(numCourses, prerequisites);
        System.out.println(result);


    }
}
