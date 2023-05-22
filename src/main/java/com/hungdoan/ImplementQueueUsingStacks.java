package com.hungdoan;

import java.util.Deque;
import java.util.LinkedList;

public class ImplementQueueUsingStacks {

    private Deque<Integer> rightSequenceStack;

    private Deque<Integer> switchingStack;

    /**
     * Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
     * <p>
     * Implement the MyQueue class:
     * <p>
     * void push(int x) Pushes element x to the back of the queue.
     * int pop() Removes the element from the front of the queue and returns it.
     * int peek() Returns the element at the front of the queue.
     * boolean empty() Returns true if the queue is empty, false otherwise.
     * Notes:
     * <p>
     * You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
     * Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
     */
    public ImplementQueueUsingStacks() {
        rightSequenceStack = new LinkedList<>();
        switchingStack = new LinkedList<>();
    }

    public void push(int x) {
        while (rightSequenceStack.isEmpty() == false) {
            Integer number = rightSequenceStack.removeFirst();
            switchingStack.addFirst(number);
        }

        rightSequenceStack.addFirst(x);
        while (switchingStack.isEmpty() == false) {
            Integer number = switchingStack.removeFirst();
            rightSequenceStack.addFirst(number);
        }
    }

    public int pop() {
        return rightSequenceStack.removeFirst();
    }

    public int peek() {
        return rightSequenceStack.peekFirst();
    }

    public boolean empty() {
        return rightSequenceStack.isEmpty();
    }

    public static void main(String[] args) {
        ImplementQueueUsingStacks queue = new ImplementQueueUsingStacks();
        queue.push(5);
        queue.push(10);
        queue.push(15);
        System.out.println(queue.pop());
        System.out.println(queue.peek());
        System.out.println(queue.empty());
    }
}
