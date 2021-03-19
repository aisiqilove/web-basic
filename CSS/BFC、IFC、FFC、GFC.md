BFC、IFC、FFC、GFC是什么，主要解决的什么问题，哪些元素会生成BFC？本文主要针对这几个问题来了解。
在解释之前，需要先介绍 **Box**、**Formatting Context**的概念。

> **Box: CSS布局的基本单位**

Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。 `元素的类型和 display 属性，决定了这个 Box 的类型` 。 不同类型的 Box， 会参与不同的 `Formatting Context` （一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

> block-level box:
> `display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context` ；

inline-level box:
`display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context` ；

run-in box: `display 属性为flex,grid`

* 如果 run-in box 包含 block box，那么这个 run-in box 也成为 block box
* 如果紧跟在 run-in box 之后的兄弟节点是 block box，那么这个 run-in box 就会做为此 block box 里的 inline box，run-in box 不能进入已经一个已经以 run-in box 开头的块内，也不能进入本身就是 display:run-in; 的块内
* 否则，run-in box 成为 block box

> **Formatting context**
> ormatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

## BFC

`BFC(Block formatting context)` 直译为”块级格式化上下文”。它是一个独立的渲染区域，只有**Block-level box**参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

### BFC布局规则：

* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

### 哪些元素会生成BFC

* 根元素
* float属性不为none
* position为absolute或fixed
* display为inline-block, table-cell, table-caption, flex, inline-flex
* overflow不为visible

### BFC的作用及原理

* 自适应两栏布局

我们可以通过通过触发main生成BFC， 来实现自适应两栏布局。

``` 
.main {
    overflow: hidden;
}
```

* 清除内部浮动

为达到清除内部浮动，我们可以触发par生成BFC，那么par在计算高度时，par内部的浮动元素child也会参与计算。

``` 
.par {
    overflow: hidden;
}
```

* 防止垂直 margin 重叠

我们可以在p外面包裹一层容器，并触发该容器生成一个BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了。

``` 
<style>
    .wrap {
        overflow: hidden;
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <div class="wrap">
        <p>Hehe</p>
    </div>
</body>
```

因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。

## IFC

IFC(Inline-Formatting-Contexts)即内联格式化上下文布局。一般都是行内元素比如：input a img span 以及display 属性值为inline-block的元素。

### 行内元素有哪些特点呢。？如下列举：

* 水平方向根据direction依次布局。
* 不会在元素前后换行。
* 受white-space属性的影响。
* **margin/padding 在竖直方向无效，水平方向有效的**。
* **white/height 对非替换行内元素无效，宽度由元素内容决定**。
* 非替换行内元素的行框高由line-height决定而替换行内元素的行框高则是由height，padding，border，margin决定
* 浮动或者绝对定位会转化为block
* vertical-align属性生效

### IFC的布局规则如下：

* 框会从*包含块*的顶部开始，然后一个接一个的排列。
* 在放置这些框的时候，他们在水平方向上的外边距，边框和内边距所占的空间都会被考虑在内（这样就得到了一个一个的框）。然而在垂直方向上，这些框可能会以不同的方式来对齐，比如他们可以顶部对齐，或者底部对齐也有可能按照文本的基线对齐。`而把这一行上的框都包含进去的一个大框我们称之为改行的行框`。水平的padding, border, margin有效，竖直方向则无效。不能指定框高。
* 行宽的宽度由包含块和存在的浮动决定的。行框的高度至少会高到足以包含他内部的所有框。
* 当一行上的行级总宽度（某一个小框的宽度或者若干个小框的总宽度）小于行宽的时候，他们在行宽内的水平方向上的排布由text-align决定。
* 当一个行内框的宽度超过了该行的行宽的时候，就会被分成几个框。(ex. 文字换行的时候 字都不在同一行了，那换行的时候自然就会多一份框，自然也就多了一份行宽)但是如果设置这个框就不能被分割的话（比如，文字强制不给换行white-space设置为nowrap）那么这时候该行内框就会溢出该行的行宽。
* 一般情况下行宽的左边紧贴在他的包含块的左边，同样他的右边也是紧贴在其包含块的右边。但是也不一定，比如出现浮动的话，浮动元素可能会插在包含块和行框之间。所以一般在同一个IFC中行框通常有相同的宽度（包含快的宽度）但是某一行的行宽的宽度也可能受浮动元素影响，减少了水平可用的宽度了。在同一个IFC中，行框的高度通常是变化的，不一定的，比如某一行的某个框是个很高的图片，而改行框中其他框只是文字。
* 计算行框内各个框的高度，对于非替换元素就是起line-height, 而对于替换元素就是边界框的高度了。 `行框的高是最顶端框的顶边到最底端框的底边的距离`。

> 补充：包含块的概念：
> 简单说就是定位参考框或者定位坐标参考系，元素一旦定义了定位显示（相对、绝对、固定）都具有包含块性质，它所包含的定位元素都将以该包含块为坐标系进行定位和调整。
> 是视觉格式化模型的一个重要概念，它与框模型类似，也可以理解为一个矩形，而这个矩形的作用是为它里面包含的元素提供一个参考，元素的尺寸和位置的计算往往是由该元素所在的包含块决定的。

## FFC

弹性布局(FFC-Flex Formattig-Contexts 自适应格式化上下文)申明 display:flex; 或者display:inline-flex(行内弹性布局)

这个布局是我最爱的布局之一了，因为他可以非常轻松的实现元素的上下居中，左右居中；只需要 `justify-content:center` （左右居中） `align-items:center;` (上下居中)就ok了. 申明flex之后这个元素就会成为一个flex容器，而他的子元素就会自动成为这个容器的成员，简称为项目。而其中又会有两个轴线（类似于笛卡尔坐标系的两个轴吧）横的称之为主轴，竖着的称之为交叉轴，容器是一个相对独立的渲染区域，他对自己内部的项目有着自己的一套渲染规则，不受容器外部的影响，同样的，容器内部的规则也不会影响外面。

### 容器属性：

六个属性分别为： `flex-direction,flex-wrap,flex-flow,justify-content,align-items,align-content`

### 项目属性：

六个属性分别为： `order，flex-grow，flex-shrink，flex-basis，flex，align-self`

### GFC

GFC（Grid Formatting Contexts）栅格格式化上下文

当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。

那么GFC有什么用呢，和table又有什么区别呢？
首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。
