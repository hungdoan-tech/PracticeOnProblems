package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

import java.util.Stack;

public class PalindromeLinkedList {

    public static ListNode tempHead;

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.addAll(new int[]{1, 2, 3, 4});
        tempHead = linkedList.head;

        PalindromeLinkedList palindromeLinkedList = new PalindromeLinkedList();
        boolean palindrome = palindromeLinkedList.isPalindrome3(linkedList.head);
        System.out.println(palindrome);
    }

    /**
     * Given the head of a singly linked list, return true if it is a
     * palindrome or false otherwise.
     *
     * @param head
     * @return
     */
    public static boolean isPalindrome(ListNode head) {

        if (head == null) {
            return true;
        }

        if (isPalindrome(head.next) == false) {
            return false;
        }

        if (head.val != tempHead.val) {
            return false;
        }

        tempHead = tempHead.next;
        return true;
    }

    public boolean isPalindrome2(ListNode head) {

        if (head == null) {
            return false;
        }

        if (head.next == null) {
            return true;
        }

        if (head.next.next == null) {
            return head.val == head.next.val;
        }

        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        ListNode middle = slow;
        if (fast.next == null) {
            return handle(head, middle, middle.next);
        }

        if (middle.val != middle.next.val) {
            return false;
        }

        return handle(head, middle, middle.next.next);
    }

    private boolean handle(ListNode head, ListNode middle, ListNode halfbackStarter) {
        Stack<ListNode> halfback = new Stack<>();

        ListNode runner = halfbackStarter;
        while (runner != null) {
            halfback.add(runner);
            runner = runner.next;
        }

        runner = head;
        while (runner != middle) {

            if (runner.val != halfback.pop().val) {
                return false;
            }

            runner = runner.next;
        }

        return true;
    }

    public boolean isPalindrome3(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast.next != null && fast.next.next != null) {

            fast = fast.next.next;
            slow = slow.next;
        }

        ListNode reversedHalfbackHead = null;

        ListNode runner = slow.next;

        while (runner != null) {

            ListNode nxt = runner.next;
            runner.next = reversedHalfbackHead;
            reversedHalfbackHead = runner;
            runner = nxt;
        }

        runner = head;
        while (reversedHalfbackHead != null) {

            if (reversedHalfbackHead.val != runner.val) {
                return false;
            }

            reversedHalfbackHead = reversedHalfbackHead.next;
            runner = runner.next;
        }

        return true;
    }
}
