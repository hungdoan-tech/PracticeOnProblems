package com.hungdoan;

import com.hungdoan.support.TreeNode;

public class SubtreeOfAnotherTree {

    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) {
            return false;
        }

        if (root.val == subRoot.val && isIdentical(root, subRoot)) {
            return true;
        }

        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    private boolean isIdentical(TreeNode node, TreeNode subRoot) {
        if (node == null && subRoot == null) {
            return true;
        }

        if (node == null || subRoot == null) {
            return false;
        }

        return node.val == subRoot.val &&
                isIdentical(node.left, subRoot.left) &&
                isIdentical(node.right, subRoot.right);
    }
}
