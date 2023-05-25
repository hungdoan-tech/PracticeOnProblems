package com.hungdoan.support;

public class LinkedList {

    public ListNode head;

    public ListNode tail;

    public LinkedList() {
        this.head = null;
        this.tail = null;
    }

    public ListNode add(int num) {
        if (head == null && tail == null) {
            this.head = new ListNode(num);
            this.tail = this.head;
            return this.tail;
        }

        ListNode newNode = new ListNode(num);
        this.tail.next = newNode;
        this.tail = newNode;
        return tail;
    }
}
