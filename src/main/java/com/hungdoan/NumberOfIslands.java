package com.hungdoan;

/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 * <p>
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 * <p>
 * <p>
 * <p>
 * Example 1:
 * <p>
 * Input: grid = [
 * ["1","1","1","1","0"],
 * ["1","1","0","1","0"],
 * ["1","1","0","0","0"],
 * ["0","0","0","0","0"]
 * ]
 * Output: 1
 * Example 2:
 * <p>
 * Input: grid = [
 * ["1","1","0","0","0"],
 * ["1","1","0","0","0"],
 * ["0","0","1","0","0"],
 * ["0","0","0","1","1"]
 * ]
 * Output: 3
 * <p>
 * <p>
 * Constraints:
 * <p>
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 300
 * grid[i][j] is '0' or '1'.
 */
public class NumberOfIslands {

    public int numIslands(char[][] grid) {

        int height = grid.length;
        if (height == 0) {
            return 0;
        }

        int width = grid[0].length;
        int count = 0;
        for (int i = 0; i < height; i++) {

            for (int j = 0; j < width; j++) {

                if (grid[i][j] == '0') {
                    continue;
                }

                islandMarking(grid, i, j);
                count++;
            }
        }
        return count;
    }

    private void islandMarking(char[][] grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == '0') {
            return;
        }
        grid[i][j] = '0';

        islandMarking(grid, i + 1, j);
        islandMarking(grid, i - 1, j);
        islandMarking(grid, i, j + 1);
        islandMarking(grid, i, j - 1);
    }

    public static void main(String[] args) {
        char[][] grid = new char[][]{{'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '0', '0', '0'}};

        grid = new char[][]{
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };
        NumberOfIslands instance = new NumberOfIslands();
        int islands = instance.numIslands(grid);
        System.out.println(islands);
    }
}
