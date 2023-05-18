package com.hungdoan;

public class FloodFill {

    public static void main(String[] args) {
        int[][] image1 = {{1,1,1},{1,1,0},{1,0,1}};
        drawImage(image1);
        int[][] afterChangedImage = floodFill(image1, 1, 1, 2);
        System.out.println();
        drawImage(afterChangedImage);


        int[][] image2 = {{0,0,0},{0,0,0}};
        drawImage(image2);
        int[][] afterChangedImage2 = floodFill(image2, 0, 0, 0);
        System.out.println();
        drawImage(afterChangedImage2);
    }

    /**
     * An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
     *
     * You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].
     *
     * To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.
     *
     * Return the modified image after performing the flood fill.
     *
     * @param image
     * @param sr
     * @param sc
     * @param color
     * @return
     */
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        if(image[sr][sc] == color){
            return image;
        }
        return floodFillWithExistingColor(image, sr, sc, image[sr][sc] ,color);
    }

    public static int[][] floodFillWithExistingColor(int[][] image, int row, int column, int existingColor, int newColor){

        if(row < 0 || row >= image.length || column < 0 || column >= image[0].length){
            return image;
        }

        if(image[row][column] != existingColor) {
            return image;
        }

        image[row][column] = newColor;
        floodFillWithExistingColor(image, row - 1, column, existingColor, newColor);
        floodFillWithExistingColor(image, row + 1, column, existingColor, newColor);
        floodFillWithExistingColor(image, row, column - 1, existingColor, newColor);
        floodFillWithExistingColor(image, row, column + 1, existingColor, newColor);
        return image;
    }

    public static void drawImage(int[][] image){
        for(int i = 0; i<image.length; i++){
            for(int j = 0; j < image[0].length; j++) {
                System.out.print(image[i][j] + " ");
            }
            System.out.println();
        }
    }
}
