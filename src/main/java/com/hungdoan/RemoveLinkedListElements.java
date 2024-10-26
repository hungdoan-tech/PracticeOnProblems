package com.hungdoan;

import com.hungdoan.support.ListNode;

public class RemoveLinkedListElements {

    public ListNode removeElements(ListNode head, int val) {
        while (head != null && head.val == val) {
            head = head.next;
        }

        if (head == null || head.next == null) {
            return head;
        }

        ListNode slow = head;
        ListNode fast = head.next;

        while (fast != null) {

            if (fast.val == val) {
                slow.next = fast.next;
                fast = slow.next;
                continue;
            }

            slow = slow.next;
            fast = fast.next;
        }

        return head;
    }
}
