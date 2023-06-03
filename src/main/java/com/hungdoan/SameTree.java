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
            return true;
        }

        return false;
    }
}
