## vue编译

### 编译原理

template=>ast=>render

ast => render 运行之前
vnode => dom 运行时

### vue3 

运行app之前 compile => render()

**init** => 数据响应式+依赖收集 => componentEffect() 
mount() => render() => vnode => patch(null, n2) => dom

**update**
componentEffect() => render() => vnode => patch(n1, n2)

执行时刻：

* webpack环境：vue-loader能将.vue文件提前转换，过程中将template预编译，所以运行是在项目打包时，这种情况不需要编译器，vue.runtime.js，字符串模板是不允许的，即template选项

* vue.global.js: 携带编译器，它会在运行时提前编译组件模板，允许字符串模板

### vue3编译

* 步骤1：template => ast

baseCompile => baseParse 

* 步骤2：transform() 转换 解析指令 、 属性 、样式

* 步骤3：生成generate() ast生成渲染函数

### vue3编译优化

<!-- dev-compiler -->

1. 静态节点提升 （静态节点可以直接跳过）
2. 补丁标记和动态属性记录 (有利于新旧节点对比)
3. 缓存事件处理程序（缓存函数，避免重复创建 造成不必要的更新 和 react useCallback类似）
4. 块 block

``` html 
<div>

	<p>Hello World!</p>
	<p :title="title" style="color: #fff;">Hello World!</p>
	<p @click="onClick">Hello World!</p>

  <span>123</span>
</div>

``` 

``` js

import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

// 1. 静态节点标记
const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "Hello World!", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createVNode("span", null, "123", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  // 4. _createBlock 动态数组  直接更新保存的区块中动态的节点 无需循环递归节点
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _createVNode("p", {
      title: _ctx.title,
      style: {"color":"#fff"}
    }, "Hello World!", 8 /* PROPS */, ["title"]),                               // 2. 补丁标记 8 /* PROPS */ 和动态属性记录 ["title"]
    _createVNode("p", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))  // 3. 缓存事件处理
    }, "Hello World!"),
    _hoisted_2
  ]))
}

// Check the console for the AST

```

### vue3虚拟dom和patch

**新vnode结构**

[vnode-1](../img/vue3-vnode1.jpg)
[vnode-2](../img/vue3-vnode2.jpg)



