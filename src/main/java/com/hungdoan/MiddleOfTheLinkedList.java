package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

public class MiddleOfTheLinkedList {

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        LinkedList linkedList = new LinkedList();
        linkedList.addAll(arr);
        System.out.println(middleNode(linkedList.head));
    }

    /**
     * Given the head of a singly linked list, return the middle node of the linked list.
     * <p>
     * If there are two middle nodes, return the second middle node.
     *
     * @param head
     * @return
     */
    public static ListNode middleNode(ListNode head) {

        ListNode slowPointer = head;
        ListNode fastPointer = head;

        while (fastPointer != null) {
            slowPointer = slowPointer.next;
            fastPointer = fastPointer.next.next;
        }

        return slowPointer;
    }


}
