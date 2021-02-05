function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

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

// 合并两个有序链表 (循环)
function mergeTwoLists (l1, l2) {
  let head = new ListNode(-1)
  let prev = head
  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      prev.next = l1
      l1 = l1.next
    } else {
      prev.next = l2
      l2 = l2.next
    }
    prev = prev.next
  }
  prev.next = l1 == null ? l2 : l1
  return head.next
}

// 合并两个有序链表 (递归)
function mergeTwoLists2 (l1, l2) {
  if (!l1) return l2
  if (!l2) return l1
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists2(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists2(l1, l2.next)
    return l2
  }
}

// 删除链表的倒数第 N 个结点 (循环两次)
function removeNthFromEnd (head, n) {
  const getListNodeLen = (head) => {
    let len = 0
    while (head) {
      ++len
      head = head.next
    }
    return len
  }
  let dummy = new ListNode(0, head)
  let cur = dummy
  for (let i = 0; i < len - n; i++) {
    cur = cur.next
  }
  cur.next = cur.next.next

  let ans = dummy.next
  delete dummy
  return ans
}

// 删除链表的倒数第 N 个结点 (循环一次，快慢指针)
function removeNthFromEnd2 (head, n) {
  let dummy = new ListNode(0, head)
  let slow = dummy
  let fast = head
  for (let i = 0; i < n; i++) {
    fast = fast.next
  }
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  let ans = dummy.next
  delete dummy
  return ans
}

// 求链表的中间结点 (快慢指针)

function middleNode (head) {
  if (head == null || head.next == null) {
    return head;
  }
  let slow = fast = head
  while (fast && fast.next) {
    slow = head.next
    fast = head.next.next
  }
  return slow
}

// 求链表的中间结点 (快慢指针)

function middleNode2 (head) {
  if (head == null || head.next == null) {
    return head;
  }
  let slow = fast = head
  while (fast && fast.next) {
    slow = head.next
    fast = head.next.next
  }
  return slow
}