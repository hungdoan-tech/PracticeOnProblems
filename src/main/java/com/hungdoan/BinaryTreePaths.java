package com.hungdoan;

import com.hungdoan.support.TreeNode;

import java.util.Collections;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class BinaryTreePaths {

    public List<String> binaryTreePaths(TreeNode root) {

        if (root == null) {
            return Collections.emptyList();
        }

        if (root.left == null && root.right == null) {
            return List.of(String.valueOf(root.val));
        }

        List<String> result = new LinkedList<>();
        Deque<Pair<TreeNode, String>> stack = new LinkedList<>();
        stack.push(new Pair<>(root, String.valueOf(root.val)));

        while (!stack.isEmpty()) {
            Pair<TreeNode, String> current = stack.pop();
            TreeNode node = current.getKey();
            String path = current.getValue();

            if (node.left == null && node.right == null) {
                result.add(path);
                continue;
            }

            if (node.right != null) {
                stack.push(new Pair<>(node.right, path + "->" + node.right.val));
            }

            if (node.left != null) {
                stack.push(new Pair<>(node.left, path + "->" + node.left.val));
            }
        }

        return result;
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
