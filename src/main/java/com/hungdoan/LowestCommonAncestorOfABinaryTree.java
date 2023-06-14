package com.hungdoan;

import com.hungdoan.support.TreeNode;

public class LowestCommonAncestorOfABinaryTree {

    /**
     * Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
     * <p>
     * According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
     *
     * @param root
     * @param p
     * @param q
     * @return
     */
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (p.left == q || p.right == q) {
            return p;
        }

        if (q.left == p || q.right == p) {
            return q;
        }
        return find(root, p, q);
    }

    private TreeNode find(TreeNode node, TreeNode p, TreeNode q) {
        if (node == null) {
            return null;
        }

        if (node == p || node == q) {
            return node;
        }

        TreeNode leftNode = find(node.left, p, q);

        TreeNode rightNode = find(node.right, p, q);

        if (leftNode == p && rightNode == q || leftNode == q && rightNode == p) {
            return node;
        }

        if (leftNode == null && rightNode == null) {
            return null;
        }

        if (leftNode != null && rightNode == null) {
            return leftNode;
        }

        return rightNode;
    }
}
