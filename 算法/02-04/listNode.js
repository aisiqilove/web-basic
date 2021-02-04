/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 单链表反转
function reverse (head) {
  if (head == null || head.next == null) return head
  let last = reverse(head.next)
  head.next.next = head
  head.next = null
  return last
}

// 判断链表中环
function isCycle (head) {
  let p1 = head
  let p2 = head
  while (p1 != null && p2.next != null) {
    if (p1 == p2) return true
  }
  return false
}

// 合并两个有序链表
function mergeTwoLists(l1,l2) {

}