package com.hungdoan.support;

public class BinaryTree {

    private TreeNode root;

    public void add(int[] arr) {

        for (int i = 0; i < arr.length; i++) {

            int currentValue = arr[i];

            if (root == null) {
                root = new TreeNode(currentValue);
            }

            
        }
    }
}
