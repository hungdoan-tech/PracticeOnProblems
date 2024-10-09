package com.hungdoan;

public class RemoveNthNodeFromEndOfList {

    public ListNode removeNthFromEnd(ListNode head, int n) {
        if (head == null || head.next == null) {
            return null;
        }

        if (n <= 0) {
            return head;
        }

        // [1, 2] 1
        // [1, 2] 2
        int delay = n;
        ListNode beforeDeletingNode = null;
        ListNode nextOfTail = head;

        while (nextOfTail != null) {

            nextOfTail = nextOfTail.next;

            if (delay > 0) {
                delay--;
                continue;
            }

            if (beforeDeletingNode == null) {
                beforeDeletingNode = head;
                continue;
            }

            beforeDeletingNode = beforeDeletingNode.next;
        }

        if (beforeDeletingNode == null) {
            return head.next;
        }

        ListNode nextToDeletingNode = beforeDeletingNode.next.next;
        beforeDeletingNode.next = nextToDeletingNode;

        return head;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1, new ListNode(2));
        RemoveNthNodeFromEndOfList instance = new RemoveNthNodeFromEndOfList();
        instance.removeNthFromEnd(head, 2);
    }

    public static class ListNode {
        int val;
        ListNode next;

        ListNode() {
        }

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }
}
