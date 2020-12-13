# MVVM框架的三要素：响应式、模版引擎、模版渲染

响应式：vue如何监听数据变化
模版：vue的模版如何编写和解析
渲染：vue如何讲模版转换成html

# vue组件化

## 定义

组件是**可复用的vue实例**，准确的说是VueComponent的实例 继承自Vue

## 优点

从平时写代码可以看出，增加代码的**复用性**、**可维护性**、**可测试性**

## 使用场景

通用组件：实现最基本的功能 具有通用性、复用性，例如：按钮、输入框、弹框、提示、布局等
业务组件：根据不同业务场景，具有一定复用性；轮播图、登陆组件等
页面组件：组织应用各部分独立内容，需要在不同页面组件间切换；列表组件、详情页

## 如何使用组件

1. 定义：

全局注册组件 Vue.component
局部注册组件 components 
单文件组件 sfc

2. 分类

有状态组件
无状态组件 functional
抽象组件 abstract

3. 通信

props、$on/$emit、vuex、eventBus、provide/inject、$children/$parent/$root/$attrs/$listeners

4. 内容分发

slot 匿名、具名、作用域插槽

5. 使用及优化 

is、keep-alive、异步组件

## 组件的本质

组件配置 -》VueComponent实例 -》render() -》 Vdom -》 dom
所以**组件的本质是产生虚拟dom**
