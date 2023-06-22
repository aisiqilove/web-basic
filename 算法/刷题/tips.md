# 刷题

150题左右

## 数据结构

1. 链表

```js
// 链表节点
let sentry = {
    next: head
}
let p = sentry
while (p) {
    p = p.next
}
return sentry.next
```

2. 数组

```js
for (let i= 0;i<arr.length; i==) {
    arr[i]
}
```

3. 树(培养算法思维刷爆)

```js
//(二叉树)

function walk(treeNode) {
    // 终止条件
    if (!treeNode) return
    // 处理treeNode
    walk(treeNode.left)
    // 处理treeNode
    walk(treeNode.right)
    // 处理treeNode

}

```

4. 字符串  字节面试喜欢问

## 算法思想

1. 二分
   1. 有序数组 找一个数

```js
    let left = 0
    let right = arr.length - 1
    while (left <= right) {
        let mid = (left + right) >> 1
        if (arr[mid] === target) {
            return mid
        } else if (arr[mid] < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
```

1. 双指针 （快慢指针、头尾指针）
   1. 链表、数组

```js
let fast = head
let slow = head
while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
}
```

3. 递归回溯 （递归树）

```js
function backTrack(数据，路径缓存) {
    // 终止条件
    
    循环：
        标记
        backTrack(数据，路径缓存)
        撤销标记
}
```

4. 动态规划

```js
// 推导出状态转移方程
// 找零钱[1,2,5] 11
// dp[i] = Math.max(dp[10],dp[9],dp[6]) + 1

// 边界条件
// 循环：
//     递推公式
// 循环硬币
// dp[n] n为目标金额 的最优解

```

5. 贪心
6. bfs（深度优先） dfs（回溯 广度优先）

```js
function DFS(treeNode) {
    // 终止条件
    if (!treeNode) return
    // 处理treeNode
    DFS(treeNode.left)
    // 处理treeNode
    DFS(treeNode.right)
    // 处理treeNode

}
```
```js
function BFS(root) {
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
        let current = queue.shift();
        console.log(current.val);
        if (current.left) {
            queue.push(current.left)
        }
        if (current.right) {
            queue.push(current.right)
        }
    }
}
```

## 题型

1. 盛水
2. 炒股
3. 打劫
4. 背包
5. 零钱
...

## 拓展

1. 图
2. 哈希表
...
