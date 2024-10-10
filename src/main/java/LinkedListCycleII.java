import java.util.HashMap;
import java.util.Map;

public class LinkedListCycleII {

    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) {
            return null;
        }

        Map<ListNode, ListNode> listNodes = new HashMap<>();
        ListNode runner = head;

        while (runner != null) {

            if (listNodes.get(runner.next) != null) {
                return listNodes.get(runner.next);
            }

            listNodes.put(runner, runner);
            runner = runner.next;
        }

        return null;
    }

    public ListNode detectCycle2(ListNode head) {
        if (head == null || head.next == null) {
            return null;
        }

        ListNode tortoise = head;
        ListNode hake = tortoise;
        ListNode runner = head;

        while (hake.next != null && hake.next.next != null) {

            tortoise = tortoise.next;
            hake = hake.next.next;

            if (tortoise == hake) {
                while (runner != tortoise) {
                    runner = runner.next;
                    tortoise = tortoise.next;
                }
                return runner;
            }
        }

        return null;
    }

    public static void main(String[] args) {

        ListNode node3 = new ListNode(3);
        ListNode node2 = new ListNode(2);
        ListNode node0 = new ListNode(0);
        ListNode node4 = new ListNode(4);

        node3.next = node2;
        node2.next = node0;
        node0.next = node4;
        node4.next = node2;

        LinkedListCycleII linkedListCycleII = new LinkedListCycleII();
        ListNode listNode = linkedListCycleII.detectCycle2(node3);
        System.out.println(listNode.val);
    }


    public static class ListNode {

        int val;

        ListNode next;

        ListNode(int x) {
            val = x;
            this.next = null;
        }

        ListNode(int x, ListNode next) {
            val = x;
            this.next = next;
        }
    }
}