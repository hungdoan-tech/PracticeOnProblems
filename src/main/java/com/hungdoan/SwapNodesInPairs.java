package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

public class SwapNodesInPairs {

    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode returnHead = head.next;

        ListNode previous = null;
        ListNode first = head;
        ListNode second = head.next;
        while (second != null) {

            ListNode next = second.next;

            if (previous != null) {
                previous.next = second;
            }

            second.next = first;
            first.next = next;

            previous = first;
            first = next;

            if (next == null) {
                break;
            }
            second = next.next;
        }

        return returnHead;
    }

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.addAll(new int[]{1, 2, 3, 4, 5, 6});
        SwapNodesInPairs swapNodesInPairs = new SwapNodesInPairs();
        ListNode newHead = swapNodesInPairs.swapPairs(linkedList.head);

        ListNode runner = newHead;
        while (runner != null) {
            System.out.println(runner.val);
            runner = runner.next;
        }
    }
}
