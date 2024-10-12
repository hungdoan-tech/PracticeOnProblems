package com.hungdoan;

import com.hungdoan.support.ListNode;

public class MaximumTwinSumOfALinkedList {

    public int pairSum(ListNode head) {

        if (head.next.next == null) {
            return head.val + head.next.val;
        }

        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode reverseHead = null;
        ListNode runner = slow.next;

        while (runner != null) {
            ListNode next = runner.next;
            runner.next = reverseHead;
            reverseHead = runner;
            runner = next;
        }

        int max = 0;
        runner = reverseHead;
        while (runner != null) {

            int sum = runner.val + head.val;
            if (sum > max) {
                max = sum;
            }

            runner = runner.next;
            head = head.next;
        }

        return max;
    }
}
