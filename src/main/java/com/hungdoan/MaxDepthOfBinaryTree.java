package com.hungdoan;

import com.hungdoan.support.TreeNode;

public class MaxDepthOfBinaryTree {

    /**
     * Given the root of a binary tree, return its maximum depth.
     * <p>
     * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
     *
     * @param root
     * @return
     */
    public int maxDepth(TreeNode root) {
        return findMaxDepth(root) + 1;
    }

    private int findMaxDepth(TreeNode root) {
        if (root == null) {
            return -1;
        }

        int leftDepth = findMaxDepth(root.left) + 1;

        int rightDepth = findMaxDepth(root.right) + 1;

        return leftDepth >= rightDepth ? leftDepth : rightDepth;
    }
}
