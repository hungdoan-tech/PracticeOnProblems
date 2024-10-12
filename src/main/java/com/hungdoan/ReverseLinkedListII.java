package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

public class ReverseLinkedListII {

    public static ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode runner = head;
        ListNode beforeLeftNode = null;
        ListNode rightNode = null;
        int index = 1;
        int originalLeft = left;
        left--;

        while (runner != null) {

            if (originalLeft != 1 && index == left) {
                beforeLeftNode = runner;
            }

            if (index == right) {
                rightNode = runner;
            }

            index++;
            runner = runner.next;
        }

        ListNode afterRightNode = rightNode.next;
        ListNode startOfTheReverse = afterRightNode;
        runner = beforeLeftNode == null ? head : beforeLeftNode.next;

        while (runner != afterRightNode) {
            ListNode nextNode = runner.next;
            runner.next = startOfTheReverse;
            startOfTheReverse = runner;
            runner = nextNode;
        }

        if (beforeLeftNode == null) {
            return startOfTheReverse;
        }

        beforeLeftNode.next = startOfTheReverse;
        return head;
    }

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.add(3);
        linkedList.add(5);
        System.out.println(reverseBetween(linkedList.head, 1, 2));
    }
}
