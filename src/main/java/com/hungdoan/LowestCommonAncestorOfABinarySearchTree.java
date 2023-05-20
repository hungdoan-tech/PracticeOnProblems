package com.hungdoan;

import com.hungdoan.support.BinaryTree;
import com.hungdoan.support.TreeNode;

public class LowestCommonAncestorOfABinarySearchTree {

    public static void main(String[] args) {
        int[] input = {5, 3, 6, 2, 4, -1, -1, 1};

        BinaryTree tree = new BinaryTree();
        for (int num : input) {
            tree.insert(num);
        }

        TreeNode root = tree.root;
        TreeNode node1 = tree.search(1);
        TreeNode node4 = tree.search(4);

        TreeNode treeNode = lowestCommonAncestor(root, node1, node4);
        System.out.println();
    }

    /**
     * Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes
     * in the BST.
     * <p>
     * According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between
     * two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a
     * node to be a descendant of itself).”
     * <p>
     * The number of nodes in the tree is in the range [2, 105].
     * -109 <= Node.val <= 109
     * All Node.val are unique.
     * p != q
     * p and q will exist in the BST.
     *
     * @param root
     * @param p
     * @param q
     * @return
     */
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {

        if (p.left == q || p.right == q) {
            return p;
        }

        if (q.left == p || q.right == p) {
            return q;
        }
        return find(root, p, q);
    }

    private static TreeNode find(TreeNode node, TreeNode p, TreeNode q) {

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
