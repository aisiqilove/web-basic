## diff算法

* diff是什么

diff是一个节点比较的算法

* diff来由

一种较高效的方式比对新旧两个VNode的children得出最小操作补丁。执行一个双循环是传统方式，时间复杂度O(n^2)，vue中针对web场景特点做了特别的算法优化，（普遍操作：首尾增删改，中间增删改）

* 做了什么
1. 先给新旧vnode 两头添加变量标记
2. 当新旧vnode节点首尾标记相同，直接patchVnode
3. 当旧节点首部标记对应新vnode尾部标记，将旧节点移动到尾部并patchVnode，当旧节点尾标记对应新vnode首部标记，将旧节点移动到首部并patchVnode
4. 如果在旧vnode中找到与新vnode首部标记相同节点，patchVnode 并将elmToMove移动到旧首部标记dom前面
5. 当新旧vnode没有相同标记，则通过createElm创建vnode

当旧vnode首尾标记相交，而新vnode还有节点，则表示需要批量创建节点
当新vnode首尾标记相交，而旧vnode还有节点，则表示需要批量删除节点

## patch

patch core\vdom\patch.js
首先进行树级别比较，可能有三种情况：增删改。

* new VNode不存在就删；
* old VNode不存在就增；
* 都存在就执行diff执行更新

## patchVnode

export const patch: Function = createPatchFunction({ nodeOps, modules })
比较两个VNode，包括三种类型操作：**属性更新**、**文本更新**、**子节点更新**
具体规则如下：

1. 新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren
2. 如果新节点有子节点而老节点没有子节点，先清空老节点的文本内容，然后为其新增子节点。
3. 当新节点没有子节点而老节点有子节点的时候，则移除该节点的所有子节点。
4. 当新老节点都无子节点的时候，只是文本的替换

* 同层比较 深度优先

## updateChildren

updateChildren主要作用是用一种较高效的方式比对新旧两个VNode的children得出最小操作补丁。执
行一个双循环是传统方式，vue中针对web场景特点做了特别的算法优化，（普遍操作：首尾增删改，中间增删改）我们看图说话：

[四个标记](../img/diff/diff.png)

在新老两组VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。
当oldStartIdx > oldEndIdx或者newStartIdx > newEndIdx时结束循环。首先，oldStartVnode、oldEndVnode与newStartVnode、newEndVnode两两交叉比较，共有4种比较方法。

1. 当 oldStartVnode和newStartVnode 或者 oldEndVnode和newEndVnode 满足sameVnode，直接将该VNode节点进行patchVnode即可，不需再遍历就完成了一次循环。如下图

[情况一](../img/diff/diff-1.png)

2. 如果oldStartVnode与newEndVnode满足sameVnode。说明oldStartVnode已经跑到了oldEndVnode后面去了，进行patchVnode的同时还需要将真实DOM节点移动到oldEndVnode的后面。

[情况二](../img/diff/diff-2.png)

3. 如果oldEndVnode与newStartVnode满足sameVnode，说明oldEndVnode跑到了oldStartVnode的前面，进行patchVnode的同时要将oldEndVnode对应DOM移动到oldStartVnode对应DOM的前面。

[情况三](../img/diff/diff-3.png)

4. 如果以上情况均不符合，则在old VNode中找与newStartVnode相同的节点，若存在执行patchVnode，同时将elmToMove移动到oldStartIdx对应的DOM的前面。

[情况四](../img/diff/diff-4.png)

5. 当然也有可能newStartVnode在old VNode节点中找不到一致的sameVnode，这个时候会调用createElm创建一个新的DOM节点。

[情况五](../img/diff/diff-5.png)

至此循环结束，但是我们还需要处理剩下的节点。

当结束时oldStartIdx > oldEndIdx，这个时候旧的VNode节点已经遍历完了，但是新的节点还没有。说
明了新的VNode节点实际上比老的VNode节点多，需要将剩下的VNode对应的DOM插入到真实DOM
中，此时调用addVnodes（批量调用createElm接口）。
[新增节点](../img/diff/diff-6.png)

当结束时newStartIdx > newEndIdx时，说明新的VNode节点已经遍历完了，但是老的节点还有
剩余，需要从文档中删 的节点删除。

[删除节点](../img/diff/diff-7.png)

## key的作用

* 判断两个vnode是否相同节点，必要条件之一
* 工作方式，不添加会怎样
