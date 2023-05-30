package com.hungdoan;

import com.hungdoan.support.TreeNode;

public class DiameterOfBinaryTree {


    /**
     * Given the root of a binary tree, return the length of the diameter of the tree.
     * <p>
     * The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
     * <p>
     * The length of a path between two nodes is represented by the number of edges between them.
     *
     * @param root
     * @return
     */
    public int diameterOfBinaryTree(TreeNode root) {
        if (root.left == null && root.right == null) {
            return 0;
        }

        if (root.left == null) {
            return findDepth(root.right) + 1;
        }

        if (root.right == null) {
            return findDepth(root.left) + 1;
        }

        int leftDepth = findDepth(root.left) + 1;
        int rightDepth = findDepth(root.right) + 1;
        return leftDepth + rightDepth;
    }

    public int findDepth(TreeNode node) {
        if (node == null) {
            return -1;
        }

        int leftDepth = findDepth(node.left) + 1;

        int rightDepth = findDepth(node.right) + 1;

        return leftDepth >= rightDepth ? leftDepth : rightDepth;
    }
}
