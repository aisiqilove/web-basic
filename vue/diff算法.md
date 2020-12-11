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

在新老两组VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。
当oldStartIdx > oldEndIdx或者newStartIdx > newEndIdx时结束循环。