## 数组

### 类数组

> 用getElementsByTagName/ClassName()获取的HTMLCollection、用querySelector获取的nodeList、arguments、FileList

HTMLCollection 和 NodeList，是 DOM API 提供给 JS 调用的对象。从 DOM API 设计者的角度考虑，提供一个 array-like 对象是合适的。因为 DOM API 不光 JS 用，VBScript 和 JScript 也可以用嘛，所以不可能返回一个 JS 数组。

#### 转换成数组

Array.prototype.slice.call()
Array.form()
ES6展开运算符
利用concat+apply

### forEach中的return有效果吗，如何中断forEach循环？

首先，在forEach中return不会返回，函数会继续执行。中断方法：使用try，在需要中断的地方抛出异常
官方推荐方法（替代方法）：用every和some替代forEach函数。

### JS判断数组中包含某个值

``` 

array.indexOf 返回索引值，没有找到指定元素返回-1
array.includes(searcElement[,fromIndex)
array.find(callback[,thisArg])
array.findeIndex(callback[,thisArg])
array.filter(callback[, thisArg])

```

### 数组扁平化

ES6 Array.flat([depth])、reduce+concat、扩展运算符、循环/递归多层嵌套数组IsArray

``` js
// 使用 Infinity，可展开任意深度的嵌套数组
var arr1 = [1, 2, [3, 4]];
arr1.flat();

// 使用reduce
arr1.reduce((acc, val) => acc.concat(val), []); // [1, 2, 3, 4]
// 使用扩展运算符 ...
const flattened = arr => [].concat(...arr);

// forEach 遍历数组会自动跳过空元素
const eachFlat = (arr = [], depth = 1) => {
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
  })(arr, depth)
  // 返回递归结果
  return result;
}
```

使用堆栈stack

``` js
// 无递归数组扁平化，使用堆栈
// 注意：深度的控制比较低效，因为需要检查每一个值的深度
// 也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse();
}
flatten(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```


### 数组的高阶函数

**什么是高阶函数：一个函数接收一个函数作为参数或者返回一个函数，这种函数就称之为高阶函数。（ex:回调函数，偏函数，currying（柯里化），事件节流，事件结束）**

数组中的高阶函数：map，reduce、filter、sort