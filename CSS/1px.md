## CSS单位相关问题

### 前言：

* 为什么有 1px 这个问题？
* 实现 1px 有哪些方法？这些方法分别有哪些优缺点？
* 开源项目中使用的哪些解决方案？
* 如何在项目中处理 1px 的相关问题？

### 基本概念

首先，我们要了解两个概念，一个是**像素（pixel）可以简写为px**，另外一个是**设备像素比（DPR）**

``` text
像素 ：指在由一个数字序列表示的图像中的一个最小单元，单位是 px，不可再次分割了。

设备像素比（DPR）: 设备像素比 = 设备像素 / 设备独立像素。

```

* CSS 像素 (虚拟像素)：指的是 CSS 样式代码中使用的逻辑像素，在 CSS 规范中，长度单位可以分为两类，绝对单位以及相对单位。px 是一个相对单位，相对的是设备像素。
* 设备像素 (物理像素)：指设备能控制显示的最小物理单位，意指显示器上一个个的点。从屏幕在工厂生产出的那天起，它上面设备像素点就固定不变了，和屏幕尺寸大小有关。
* 设备独立像素 (逻辑像素)：可以认为是计算机坐标系统中得一个点，这个点代表一个可以由程序使用的虚拟像素(比如: CSS 像素)，这个点是没有固定大小的，越小越清晰，然后由相关系统转换为物理像素。

**也就是说，当逻辑像素是 1pt 时，在 DPR 为 2 的 设备上显示为 2px 的物理像素**

> 移动端1px

解决方法：

* 一种是利用 css 中的 transfrom：scaleY(0.5)
* 媒体查询根据不同 DPR 缩放
* 使用图片：兼容性最好，灵活行最差，不能改变颜色、长度
* 使用 `viewport` 和 `rem`，`js` 动态改变 `viewport` 中 `scale` 缩放，缺点在于不适用于已有的项目，例如：使用 `vh` 和 `vw` 布局的

``` less
    <meta name="viewport" id="WebViewport" content="initial-scale=1,    maximum-scale=1, minimum-scale=1, user-scalable=no">
```

* 使用 css 渐变`linear-gradient`或者`box-shadow`

### 其他单位问题

> 百分比

* 宽度（width）、间距（margin/padding）支持百分比值，默认的相对参考值时包含块的宽度
* 高度（height）百分比值的大小是相对其父级元素的大小
* 边框圆角半径（border-radius）支持百分比值，水平方向相对参考值是盒子的宽度，垂直方向相对参考值是盒子的高度
* 文本大小（font-size）支持百分比值，相对参考值是父元素的font-size的值
* 边框（border）、盒阴影（box-shadow）、文本阴影（text-shadow）不支持百分比值

> vw/wh

**1vw就等于屏幕宽度的1%， 1vh就等于屏幕高度的1%**

> rem/em

rem作用于非根元素时，相对于根元素大小；rem作用于根元素字体大小时，相对于其初始字体大小，本质就是等比缩放

em作为font-size的单位时，其代表父元素的字体大小，em作为其他属性单位时，代表自身字体大小。如果改元素没有设置，则一直向父级元素查找，直到找到，如果没有设置大小，使用浏览器默认大小。

缺点：
 * rem需要借助js进行动态修改根元素大小，实现计算rem时，需要借助sass或者less等预处理的函数，不能100%等比例缩放
 * em 改变父元素的字体大小，所有子元素都回流

> 淘宝移动端自适应方案—lib.flexible库解析

[淘宝flexible](https://github.com/amfe/lib-flexible)

> ant-design-mobile 组件库

[蚂蚁金服](https://link.zhihu.com/?target=https%3A//github.com/ant-design/ant-design-mobile/blob/master/components/style/mixins/hairline.less)

> vant 组件库

[有赞](https://link.zhihu.com/?target=https%3A//github.com/youzan/vant/blob/dev/src/style/mixins/hairline.less)
