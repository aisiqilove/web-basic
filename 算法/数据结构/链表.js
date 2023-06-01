// 链表
// 链表是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)
// 链表的每个节点包含两个部分，一部分是存储数据的val，另一部分是指向下一个节点的next
// 链表的头节点称为head，尾节点称为tail
// 链表的第一个节点称为first，最后一个节点称为last
// 链表的第一个节点的prev为null，最后一个节点的next为null
// 链表的操作 1.插入 2.删除 3.查找

//由于链表插入删除效率极高，达到O(1)。对于不需要搜索但变动频繁且无法预知数量上限的数据的情况的时候，都可以使用链表

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }

}
let current = head
// 遍历
while (current) {
    console.log(current.val)
    current = current.next
}

// 插入   

while (current < position) {
    pervious = current
    current = current.next
}
pervious.next = node
node.next = current

// 删除
while (current != node) {
    pervious = current
    current = current.next
    nextNode = current.next
}
pervious.next = nextNode