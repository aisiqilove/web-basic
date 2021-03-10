## 定义和用法

line-height 属性设置行间的距离（行高）。

**注释：**不允许使用负值。

### 说明

该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。

line-height 与 font-size 的计算值之差（在 CSS 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。

原始数字值指定了一个缩放因子，后代元素会继承这个缩放因子而不是计算值。

### 4种box

要说的4种盒子分别是 `inline box` 、 `line box` 、 `content area` 、 `containing box` ~

* inline box (行内框) 每个行内元素会生成一个行内框，行内框是一个浏览器渲染模型中的一个概念，无法显示出来，行内框的高度等于`font-size`，**设定`line-height`时，行内框的高度不变，改变的是行距**。
* line box （行框） 行框是指本行的一个虚拟的矩形框，由该行中行内框组成。行框也是浏览器渲染模式中的一个概念，无法显示出来。**行框高度等于本行中所有行内框高度的最大值。**当有多行内容时，每一行都有自己的行框。
* content area （内容区） 内容区是围绕着文字的一种box，无法显示出来，其高度取决于`font-size`和`padding`。
* containing box containing box 是包裹着上述三种box的box，有点绕哈~看图

### 继承

| 设置方式 | line-height           | 计算后的line-height                  | 子元素继承的line-height                                   |
| -------- | --------------------- | ------------------------------------ | --------------------------------------------------------- |
| inherit  | 父元素的line-height值 | 不用计算                             | 父元素的line-height值                                     |
| length   | 20px                  | 不用计算                             | 20px                                                      |
| %        | 120%                  | 自身font-size (16px) * 120% = 19.2px | 继承父元素计算后的line-height值 19.2px，而不是120%        |
| normal   | 1.2                   | 自身font-size (16px) * 1.2 = 19.2px  | 继承1.2，line-height = 自身font-size(32px) * 1.2 = 38.4px |
| 纯数字   | 1.5                   | 自身font-size (16px) * 1.2 = 19.2px  | 继承1.5，line-height = 自身font-size(32px) * 1.5 = 48px   |

那么，哪一种是最好的方式呢？ 一般来数，设置行高的值为 **`纯数字`** 是最推荐的方式，因为其会随着对应的 font-size 而缩放。

## 参考

[MDN line-height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)

[深入了解css的行高Line Height属性](http://www.cnblogs.com/fengzheng126/archive/2012/05/18/2507632.html)

[CSS行高——line-height](http://www.cnblogs.com/dolphinX/p/3236686.html)

[css](https://segmentfault.com/t/css)
