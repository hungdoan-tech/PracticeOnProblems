package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

public class PalindromeLinkedList {

    public static ListNode tempHead;

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.addAll(new int[]{1, 2, 2, 1});
        tempHead = linkedList.head;
        System.out.println(isPalindrome(linkedList.head));
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
}
