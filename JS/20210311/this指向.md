## this指向

**理解JS中this的执行规则**

#### 显式绑定

call、apply、bind

#### 隐式绑定

1. 全局上下文--全局上下文this默认window，严格模式下指向undefined
2. 直接调用函数，谁调用指向谁
3. DOM事件绑定，onclick和addEventerListener中的this默认指向绑定事件的元素
4. new构造函数绑定，this指向实例对象
5. 箭头函数，箭头函数没有this，因此不能绑定。this会指向它最近的非箭头函数的this，找不到就是window（严格模式指向undefined）
6. 函数被多层包含，this指向最终调用它的对象 window.a.b.c.fn() // this ==> c
