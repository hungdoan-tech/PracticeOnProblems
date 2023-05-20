package com.hungdoan;

import com.hungdoan.support.ListNode;

import java.util.HashSet;
import java.util.Set;

public class LinkedListCycle {

    public static void main(String[] args) {
        System.out.println(hasCycle(null));
    }

    /**
     * Given head, the head of a linked list, determine if the linked list has a cycle in it.
     * <p>
     * There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
     * Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
     * <p>
     * Return true if there is a cycle in the linked list. Otherwise, return false.
     *
     * @param head
     * @return
     */
    public static boolean hasCycle(ListNode head) {
        ListNode runner = head;
        boolean isFaced = false;
        Set<ListNode> setOfNodes = new HashSet<>();

        while (isFaced == false) {

            if (runner == null) {
                return false;
            }

            if (setOfNodes.contains(runner)) {
                return true;
            }

            setOfNodes.add(runner);
            runner = runner.next;
        }

        return false;
    }
}
