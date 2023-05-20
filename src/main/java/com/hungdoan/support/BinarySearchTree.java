package com.hungdoan.support;

public class BinarySearchTree {

    public TreeNode root;

    public void insert(int num) {
        performInsert(root, num);
    }

    private TreeNode performInsert(TreeNode node, int num) {
        if (root == null) {
            root = new TreeNode(num);
            return root;
        }

        if (node == null) {
            if (num != -1) {
                node = new TreeNode(num);
            }
            return node;
        }

        if (node.val == num) {

            return node;

        } else if (node.val < num) {

            node.right = performInsert(node.right, num);

        } else if (node.val > num) {

            node.left = performInsert(node.left, num);

        }

        return node;
    }

    public void insert(TreeNode insertedNode) {
        performInsert(root, insertedNode);
    }

    private TreeNode performInsert(TreeNode node, TreeNode insertedNode) {
        if (root == null) {
            root = insertedNode;
            return root;
        }

        if (node == null) {
            if (insertedNode.val != -1) {
                node = insertedNode;
            }
            return node;
        }

        if (node.val == insertedNode.val) {

            return node;

        } else if (node.val < insertedNode.val) {

            node.right = performInsert(node.right, insertedNode);

        } else if (node.val > insertedNode.val) {

            node.left = performInsert(node.left, insertedNode);

        }

        return node;
    }

    public TreeNode search(Integer num) {
        if (root == null) {
            throw new RuntimeException("Root is null");
        }
        return performSearch(root, num);
    }

    private TreeNode performSearch(TreeNode node, Integer num) {

        if (node.val < num) {

            return performSearch(node.right, num);

        } else if (node.val > num) {

            return performSearch(node.left, num);
        }

        // equal
        return node;
    }
}
