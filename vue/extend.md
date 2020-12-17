场景:vue 组件中有些需要将一些元素挂载到元素上, 这个时候 extend 就起到作用了是构造一个组件的语法器

``` js 
var MyComponent = Vue.extend({ // 构建组件构造器
  template: '<div>Hello!</div>'
})

```
