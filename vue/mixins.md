## mixins

* extends用法和mixins很相似, 只不过接收的参数是简单的选项对象或构造函数, 所以extends只能单次扩展一个组件

**场景**: 有些组件有些重复的 js 逻辑, 如校验手机验证码, 解析时间等, mixins 就可以实现这种混入
mixins 值是一个数组

``` JS 

const mixin={
  created(){

    this.dealTime()

  }, 
  methods:{

    dealTime(){
      console.log('这是mixin的dealTime里面的方法');
    }

}
}

export default{
mixins:[mixin]
}

```
