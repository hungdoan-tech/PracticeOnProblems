package com.hungdoan;

import com.hungdoan.support.TreeNode;

public class SameTree {

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);

        TreeNode root2 = new TreeNode(1);
        root2.right = new TreeNode(2);

        System.out.println(isSameTree(root, root2));
    }

    /**
     * Given the roots of two binary trees p and q, write a function to check if they are the same or not.
     * <p>
     * Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
     *
     * @param p
     * @param q
     * @return
     */
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        } else if (p == null || q == null) {
            return false;
        }

        boolean isLeftEqual = isSameTree(p.left, q.left);

        boolean isRightEqual = isSameTree(p.right, q.right);

        if (isLeftEqual == false || isRightEqual == false) {
            return false;
        }

        if (p.val == q.val) {
            return false;
        }

        return true;
    }
}
