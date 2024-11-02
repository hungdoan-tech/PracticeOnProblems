package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

public class OddEvenLinkedList {

    public ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode evenHead = head.next;
        ListNode previousOdd = head;
        ListNode previousEven = evenHead;

        ListNode runner = previousEven.next;
        boolean isOdd = true;
        while (runner != null) {

            if (isOdd) {
                previousOdd.next = runner;
                previousOdd = runner;
            } else {
                previousEven.next = runner;
                previousEven = runner;
            }

            isOdd = !isOdd;
            runner = runner.next;
        }

        previousEven.next = null;
        previousOdd.next = evenHead;
        return head;
    }

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.addAll(new int[]{2, 1, 3, 5, 6, 4, 7});

        OddEvenLinkedList instance = new OddEvenLinkedList();
        ListNode newHead = instance.oddEvenList(linkedList.head);
        ListNode runner = newHead;
        while (runner != null) {
            System.out.println(runner.val);
            runner = runner.next;
        }
        //[2,3,6,7,1,5,4]
    }
}
