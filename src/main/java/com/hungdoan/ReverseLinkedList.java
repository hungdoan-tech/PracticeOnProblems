package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

public class ReverseLinkedList {

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
        linkedList.add(4);
        linkedList.add(5);
        System.out.println(reverseList(linkedList.head));
    }

    public static ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        return find(head);
    }

    public static ListNode find(ListNode node) {
        if (node.next == null) {
            return node;
        }

        ListNode nextNode = node.next;
        ListNode tail = find(nextNode);
        nextNode.next = node;
        node.next = null;
        return tail;
    }
}
