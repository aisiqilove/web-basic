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

### 解开密码锁的最少次数


