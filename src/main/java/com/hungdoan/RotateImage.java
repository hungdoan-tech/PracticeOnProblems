package com.hungdoan;

/**
 * You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
 * <p>
 * You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
 */
public class RotateImage {

    public void rotate(int[][] matrix) {
        int n = matrix.length - 1;

        // Traverse each layer, starting from the outer layer and moving inwards
        for (int layer = 0; layer <= n / 2; layer++) {

            // Traverse elements in the current layer
            for (int pos = layer; pos < n - layer; pos++) {

                int top = matrix[layer][pos]; // Temporarily store the top element

                // Rotate 4-way swap for 90-degree rotation
                matrix[layer][pos] = matrix[n - pos][layer]; // Move left to top
                matrix[n - pos][layer] = matrix[n - layer][n - pos]; // Move bottom to left
                matrix[n - layer][n - pos] = matrix[pos][n - layer]; // Move right to bottom
                matrix[pos][n - layer] = top; // Move top to right
            }
        }
    }

    public void rotate(int[][] matrix, int angle) {
        // Validate that the angle is a multiple of 90
        if (angle % 90 != 0) {
            throw new IllegalArgumentException("Angle must be a multiple of 90.");
        }

        // Normalize angle to be within [0, 360) by taking modulo 360
        int effectiveAngle = ((angle % 360) + 360) % 360;

        // Calculate the number of 90-degree clockwise rotations needed
        int rotations = effectiveAngle / 90;

        // Apply 90-degree clockwise rotations the required number of times
        for (int i = 0; i < rotations; i++) {
            rotate90Clockwise(matrix);
        }
    }

    // Helper function to rotate the matrix by 90 degrees clockwise
    private void rotate90Clockwise(int[][] matrix) {
        int n = matrix.length - 1;

        for (int layer = 0; layer <= n / 2; layer++) {
            for (int pos = layer; pos < n - layer; pos++) {
                int top = matrix[layer][pos];

                // Rotate 4-way swap for 90-degree clockwise rotation
                matrix[layer][pos] = matrix[n - pos][layer];
                matrix[n - pos][layer] = matrix[n - layer][n - pos];
                matrix[n - layer][n - pos] = matrix[pos][n - layer];
                matrix[pos][n - layer] = top;
            }
        }
    }


    public static void main(String[] args) {
        int[][] matrix = {
                {1, 2, 3, 4},
                {5, 6, 7, 8},
                {9, 10, 11, 12},
                {13, 14, 15, 16}
        };

        RotateImage rotateImage = new RotateImage();
        rotateImage.rotate(matrix);

        for (int[] row : matrix) {
            for (int num : row) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }
}


