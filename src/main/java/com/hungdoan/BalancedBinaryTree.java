package com.hungdoan;

import com.hungdoan.support.BinarySearchTree;
import com.hungdoan.support.TreeNode;

public class BalancedBinaryTree {

    public static void main(String[] args) {
        int[] input = {3, 9, 20, -1, -1, 15, 7};

        BinarySearchTree tree = new BinarySearchTree();
        for (int num : input) {
            tree.insert(num);
        }

        System.out.println(isBalanced(tree.root));
    }

    /**
     * Given a binary tree, determine if it is
     * height-balanced
     * <p>
     * A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
     *
     * @param root
     * @return
     */
    public static boolean isBalanced(TreeNode root) {

        if (findLength(root) >= 100) {
            return false;
        }
        return true;
    }

    public static int findLength(TreeNode node) {

        if (node == null) {
            return -1;
        }

        int leftDepth = findLength(node.left) + 1;

        int rightDepth = findLength(node.right) + 1;

        int distance = ((leftDepth - rightDepth) >= 0)
                ? (leftDepth - rightDepth)
                : ((leftDepth - rightDepth) * -1);

        if (distance > 1) {
            return 100;
        }
        return leftDepth >= rightDepth ? leftDepth : rightDepth;
    }
}



