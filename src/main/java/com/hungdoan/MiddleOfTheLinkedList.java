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
