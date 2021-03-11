# this指向问题

1. 事件调用环境，谁触发，函数里的this指谁
2. 普通函数this始终指向调用它的对象
3. 函数被多层包含，this指向最终调用它的对象 window.a.b.c.fn() // this ==> c
4. 构造函数this指向实例化对象，注意return
5. 箭头函数this指向离它最近函数作用域

``` js
var num = 1;
var myObject = {

    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            console.log(this.num);
            this.num = 4;
        })();
        // 立即执行函数this
        // function fn() {
        //     console.log(this.num);
        //     this.num = 4;
        // }
        // fn()
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num)
    }

}
myObject.add();
console.log(myObject.num);
console.log(num);
var sub = myObject.sub;
sub();
```
