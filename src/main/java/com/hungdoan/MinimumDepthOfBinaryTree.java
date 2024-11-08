package com.hungdoan;

import com.hungdoan.support.TreeNode;

import java.util.Deque;
import java.util.LinkedList;

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode() {}
 * TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
public class MinimumDepthOfBinaryTree {

    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Deque<TreeNode> nodeStack = new LinkedList<>();
        Deque<Integer> depthStack = new LinkedList<>();
        nodeStack.push(root);
        depthStack.push(1);

        int minDepth = Integer.MAX_VALUE;

        while (!nodeStack.isEmpty()) {
            
            TreeNode currentNode = nodeStack.pop();
            int currentDepth = depthStack.pop();

            if (currentNode.left == null && currentNode.right == null) {
                minDepth = Math.min(minDepth, currentDepth);
            }

            if (currentNode.left != null) {
                nodeStack.push(currentNode.left);
                depthStack.push(currentDepth + 1);
            }

            if (currentNode.right != null) {
                nodeStack.push(currentNode.right);
                depthStack.push(currentDepth + 1);
            }
        }

        return minDepth;
    }
}