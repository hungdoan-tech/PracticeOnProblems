package com.hungdoan;

public class AvarageOfLevelsInBinaryTree{

    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> averages = new ArrayList<>(); 
        List<Integer> counts = new ArrayList<>(); 

        Queue<Level> runners = new LinkedList<>();
        runners.offer(new Level(root, 0));

        while (!runners.isEmpty()) {
            Level current = runners.poll();
            TreeNode node = current.node;
            int level = current.level;

            if (averages.size() <= level) {
                averages.add(0.0);
                counts.add(0);
            }

            averages.set(level, averages.get(level) + node.val);
            counts.set(level, counts.get(level) + 1);

            if (node.left != null) {
                runners.offer(new Level(node.left, level + 1));
            }
            if (node.right != null) {
                runners.offer(new Level(node.right, level + 1));
            }
        }

        for (int i = 0; i < averages.size(); i++) {
            averages.set(i, averages.get(i) / counts.get(i));
        }

        return averages;
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