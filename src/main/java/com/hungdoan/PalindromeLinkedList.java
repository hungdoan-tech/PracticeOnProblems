package com.hungdoan;

import com.hungdoan.support.LinkedList;
import com.hungdoan.support.ListNode;

import java.util.HashSet;
import java.util.Set;

public class PalindromeLinkedList {

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.addAll(new int[]{1, 2, 1});
        System.out.println(isPalindrome(linkedList.head));
    }

    public static boolean isPalindrome(ListNode head) {
        if (head.next == null) {
            return true;
        }

        Set<Integer> set = new HashSet<>();
        ListNode runner = head;
        while (runner != null) {
            if (set.contains(runner.val)) {
                set.remove(runner.val);
                runner = runner.next;
                continue;
            }
            set.add(runner.val);
            runner = runner.next;
        }

        return set.isEmpty();
    }
}
