package com.hungdoan;

import com.hungdoan.support.TreeNode;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BinaryTreeLevelOrderTraversal {

    public List<List<Integer>> levelOrder(TreeNode root) {
        if (root == null) {
            return new LinkedList<>();
        }
        List<List<Integer>> levelOrderTraversal = new LinkedList<>();

        Queue<Level> runners = new LinkedList<>();
        runners.offer(new Level(root, 0));

        while (!runners.isEmpty()) {
            Level current = runners.poll();
            TreeNode node = current.node;
            int level = current.level;

            if (levelOrderTraversal.size() <= level) {
                levelOrderTraversal.add(new ArrayList<>());
            }

            levelOrderTraversal.get(level).add(node.val);

            if (node.left != null) {
                runners.offer(new Level(node.left, level + 1));
            }
            if (node.right != null) {
                runners.offer(new Level(node.right, level + 1));
            }
        }

        return levelOrderTraversal;
    }

    private static class Level {
        public TreeNode node;
        public int level;

        public Level(TreeNode node, int level) {
            this.node = node;
            this.level = level;
        }
    }
}
