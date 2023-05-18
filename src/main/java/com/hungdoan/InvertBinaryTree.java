package com.hungdoan;

import com.hungdoan.support.TreeNode;
import sun.reflect.generics.tree.Tree;



public class InvertBinaryTree {

    public static void main(String[] args) {
        TreeNode tree1 = new TreeNode(1);
        TreeNode tree3 = new TreeNode(3);
        TreeNode tree2 = new TreeNode(2, tree1, tree3);

        TreeNode tree6 = new TreeNode(6);
        TreeNode tree9 = new TreeNode(9);
        TreeNode tree7 = new TreeNode(7, tree6, tree9);

        TreeNode root = new TreeNode(4, tree2, tree7);
        invertTree(root);
    }

    /**
     * Given the root of a binary tree, invert the tree, and return its root.
     *
     * @param root
     * @return
     */
    public static TreeNode invertTree(TreeNode root) {
        if(root == null){
            return root;
        }

        TreeNode leftNode = invertTree(root.left);
        TreeNode rightNode = invertTree(root.right);

        root.left = rightNode;
        root.right = leftNode;

        return root;
    }
}