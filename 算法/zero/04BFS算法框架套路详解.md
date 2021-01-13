## 04 BFS算法框架套路详解

BFS 的核心思想应该不难理解的，就是把一些问题抽象成图，从一个点开始，向四周开始扩散。一般来说，我们写 BFS 算法都是用「队列」这种数据结构，每次将一个节点周围的所有节点加入队列。

BFS 相对 DFS 的最主要的区别是：BFS 找到的路径一定是最短的，但代价就是空间复杂度比 DFS 大很多

### 算法框架

要说框架的话，我们先举例一下 BFS 出现的常见场景好吧，**问题的本质就是让你在一幅「图」中找到从起点 start 到终点 target 的最近距离，这个例子听起来很枯燥，但是 BFS 算法问题其实都是在干这个事儿，**

把枯燥的本质搞清楚了，再去欣赏各种问题的包装才能胸有成竹嘛。

``` java

// 计算从起点 start 到终点 target 的最近距离
int BFS(Node start, Node target) {
    Queue<Node> q; // 核心数据结构
    Set<Node> visited; // 避免走回头路

    q.offer(start); // 将起点加入队列
    visited.add(start);
    int step = 0; // 记录扩散的步数

    while (q not empty) {
        int sz = q.size();
        /* 将当前队列中的所有节点向四周扩散 */
        for (int i = 0; i < sz; i++) {
            Node cur = q.poll();
            /* 划重点：这里判断是否到达终点 */
            if (cur is target)
                return step;
            /* 将 cur 的相邻节点加入队列 */
            for (Node x : cur.adj())
                if (x not in visited) {
                    q.offer(x);
                    visited.add(x);
                }
        }
        /* 划重点：更新步数在这里 */
        step++;
    }
}
```

``` js  

function minDepth(root) {

  if (root == null) return 0
  const queue = [root] // 将起点加入队列
  let step = 1 // 记录扩散的步数
  while (queue.length) {

    let level = queue.length
    /* 将当前队列中的所有节点向四周扩散 */
    for (let i = 0; i < level; i++) {
      const cur = queue.shift()
      /* 划重点：这里判断是否到达终点 */
      if (cur.left == null && cur.right == null) {
        return step
      }
      /* 将 cur 的相邻节点加入队列 */
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
    /* 划重点：更新步数在这里 */
    step++

  }
}

``` 

### 二叉树的最小高度

* LeetCode 第 111 题

**起点就是 root 根节点，终点就是最靠近根节点的那个「叶子节点」**,叶子节点就是两个子节点都是 null 的节点：

``` js
if (cur.left == null && cur.right == null) 
    // 到达叶子节点
```

``` js
// 先套BFS公式

function minDepth(root) {
    if (!root) return 0
    const queue = [] // 入队
    var step = 1 // 记录层级
    queue.push(root)
    while (queue.length) {
        const len = queue.length
        // 扩散所有可能
        for (let i = 0; i < len; i++) {
            const cur = queue.shift()
            // 结束条件/终点
            if (!cur.left && !cur.right) return step

            // 相邻节点入队
            if (cur.left) {
                queue.push(cur.left)
            }
            if (cur.right) {
                queue.push(cur.right)
            }
        }
        // 记录层级
        step++
    }

}

// DFS

function minDFS(root) {
    if (!root) return 0
    if (root.left && root.right) {
        return 1 + Math.min(minDFS(root.left), minDFS(root.right))
    } else if (root.left) {
        return 1 + minDFS(root.left)
    } else if (root.right) {
        return 1 + minDFS(root.right)
    } else {
        return 1
    }

}
```

### 解开密码锁的最少次数

* leetCode:752. 打开转盘锁

分析： 第一步，我们不管所有的限制条件，不管 deadends 和 target 的限制，就思考一个问题：如果让你设计一个算法，穷举所有可能的密码组合，你怎么做？

**这就可以抽象成一幅图，每个节点有 8 个相邻的节点，又让你求最短距离**，又让你求最短距离，这不就是典型的 BFS 嘛，框架就可以派上用场了，先写出一个「简陋」的 BFS 框架代码再说别的： step1 -> step2

``` js 
  // 向上转
  const plusOne = (cur, j) => {

      let arr = [...cur]
      if (arr[j] == '9') {
          arr[j] = '0'
      } else {
          arr[j]++
      }
      return arr.join('')

  }

    // 向下转
    const minusOne = (cur, j) => {

        let arr = [...cur]

        if (arr[j] == '0') {
            arr[j] = '9'
        } else {
            arr[j]--
        }
        return arr.join('')
    }

    // step1: 先套公式
    function BFS(deadends, target) {
      let start = '0000'
      const queue = []
      const deads = new Set(deadends)  // 限制
      const visited = new Set()        // 记录已经转过的密码
      let step = 0
      queue.push(start)

      while(queue.length) {
        let len = queue.length
        // 扩散所有可能
        for(let i=0;i < len; i++) {
            const cur = queue.shift()
            // step2: 跳过限制 结束条件终点 判断重复的密码
            if(deads.has(cur)) continue
            if(cur === target) return step
            
          for (let j=0; j< start.length; j++) {
            const up = plusOne(cur, j)
            const down = minusOne(cur, j)
            // 相邻节点
            // step2:  判断重复的密码
            if(!visited.has(up)) {
              queue.push(up)
              visited.add(up)
            } 
            if(!visited.has(down)) {
              queue.push(down)
              visited.push(down)
            } 
            
          }
        }

        step++
      }
      // 无解
      return -1
    }

``` 

有一个比较小的优化：可以不需要 dead 这个哈希集合，可以直接将这些元素初始化到 visited 集合中，效果是一样的，可能更加优雅一些。

### 双向 BFS 优化

**传统的 BFS 框架就是从起点开始向四周扩散，遇到终点时停止；而双向 BFS 则是从起点和终点同时开始扩散，当两边有交集的时候停止。**

**不过，双向 BFS 也有局限，因为你必须知道终点在哪里。**

``` js 
  // 向上转
  const plusOne = (cur, j) => {

      let arr = [...cur]
      if (arr[j] == '9') {
          arr[j] = '0'
      } else {
          arr[j]++
      }
      return arr.join('')

  }

    // 向下转
    const minusOne = (cur, j) => {

        let arr = [...cur]

        if (arr[j] == '0') {
            arr[j] = '9'
        } else {
            arr[j]--
        }
        return arr.join('')
    }

    // step1: 先套公式
    function BFS(deadends, target) {
      let start = '0000'
      let queue =  new Set([start])  
      let queue2 =  new Set([target])  
      const deads = new Set(deadends)  // 限制
      const visited = new Set()        // 记录已经转过的密码
      let step = 0

      while(queue.size && queue2.size) {
        var temp = new Set()
        // 扩散所有可能
        for(let cur of queue) {
            // step2: 跳过限制 结束条件终点 判断重复的密码
            if(deads.has(cur)) continue
            if(queue2.has(cur)) return step
            visited.add(cur)
            
          for (let j=0; j< start.length; j++) {
            const up = plusOne(cur, j)
            const down = minusOne(cur, j)
            // 相邻节点
            // step2:  判断重复的密码
            if(!visited.has(up)) {
              temp.add(up)
            } 
            if(!visited.has(down)) {
              temp.add(down)
            } 
            
          }
        }

        step++
        queue = queue2
        queue2 = temp
      }
      // 无解
      return -1
    }

```

双向 BFS 还是遵循 BFS 算法框架的，只是**不再使用队列，而是使用 HashSet 方便快速判断两个集合是否有交集。**

另外的一个技巧点就是**while 循环的最后交换 q1 和 q2 的内容**，所以只要默认扩散 q1 就相当于轮流扩散 q1 和 q2。

其实双向 BFS 还有一个优化，就是在 while 循环开始时做一个判断：

因为按照 BFS 的逻辑，队列（集合）中的元素越多，扩散之后新的队列（集合）中的元素就越多；在双向 BFS 算法中，如果我们每次都选择一个较小的集合进行扩散，那么占用的空间增长速度就会慢一些，效率就会高一些。
不过话说回来，无论传统 BFS 还是双向 BFS，无论做不做优化，从 Big O 衡量标准来看，时间复杂度都是一样的，只能说双向 BFS 是一种 trick，算法运行的速度会相对快一点，掌握不掌握其实都无所谓。最关键的是把 BFS 通用框架记下来，反正所有 BFS 算法都可以用它套出解法。

``` js
// ...
while (!q1.isEmpty() && !q2.isEmpty()) {
    if (q1.size() > q2.size()) {
        // 交换 q1 和 q2
        temp = q1;
        q1 = q2;
        q2 = temp;
    }
    // ...
```
