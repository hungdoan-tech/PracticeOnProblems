package com.hungdoan;

import com.hungdoan.support.TreeNode;

public class SymmetricTree {

    /**
     * Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
     *
     * @param root
     * @return
     */
    public boolean isSymmetric(TreeNode root) {
        return isSymmetricTree(root.left, root.right);
    }

    public boolean isSymmetricTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        } else if (p == null || q == null) {
            return false;
        }

        boolean isLeftEqual = isSymmetricTree(p.right, q.left);

        boolean isRightEqual = isSymmetricTree(p.left, q.right);

        if (isLeftEqual == false || isRightEqual == false) {
            return false;
        }

        if (p.val != q.val) {
            return false;
        }

        return true;
    }
}
