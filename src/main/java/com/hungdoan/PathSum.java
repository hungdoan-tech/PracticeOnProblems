package com.hungdoan;

import com.hungdoan.support.TreeNode;

import java.util.Deque;
import java.util.LinkedList;

public class PathSum {

    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }

        Deque<Pair<TreeNode, Integer>> stack = new LinkedList<>();
        stack.push(new Pair<>(root, root.val));

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> current = stack.pop();
            TreeNode node = current.getKey();
            int currentSum = current.getValue();

            if (node.left == null && node.right == null && currentSum == targetSum) {
                return true;
            }

            if (node.right != null) {
                stack.push(new Pair<>(node.right, currentSum + node.right.val));
            }

            if (node.left != null) {
                stack.push(new Pair<>(node.left, currentSum + node.left.val));
            }
        }
        
        return false;
    }

    private static class Pair<K, V> {
        private final K key;
        private final V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
    }
}
