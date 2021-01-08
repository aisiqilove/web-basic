### 04 BFS算法框架套路详解

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

**这就可以抽象成一幅图，每个节点有 8 个相邻的节点，又让你求最短距离**

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
              queue.push(down)
            } 
            
          }
        }

        step++
      }
      // 无解
      return -1
    }

```
