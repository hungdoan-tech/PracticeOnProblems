package com.hungdoan;

import org.w3c.dom.NodeList;

/**
 * Definition for singly-linked list.
 */
class ListNode {
    int val;
    ListNode next;
    public ListNode(int value) { val = value; }
}

public class Merge2LinkedList {

    public static void main(String[] args) {
        ListNode node1 = new ListNode(1);
        node1.next = new ListNode(4);
        node1.next.next = new ListNode(5);

        ListNode node2 = new ListNode(2);
        node2.next = new ListNode(3);
        node2.next.next = new ListNode(6);

        Merge2LinkedList instance =  new Merge2LinkedList();
        ListNode result = instance.mergeTwoLists(node1, node2);

        ListNode runner = result;
        while(runner != null){
            System.out.print(runner.val);
            System.out.println(" ");
            runner = runner.next;
        }
    }

    /**
     * You are given the heads of two sorted linked lists list1 and list2.
     *
     * Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
     *
     * Return the head of the merged linked list.
     * Input: list1 = [1,4,5], list2 = [2,3,6]
     * Output: [1,2,3,4,5,6]
     *
     * @param list1
     * @param list2
     * @return
     */
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if(list1 == null){
            return list2;
        }
        if(list2 == null){
            return list1;
        }

        if(list1.val >= list2.val){

            return list2;
        }
        else {

            return list1;
        }
    }
}
