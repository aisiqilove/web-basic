## Webpack 是什么

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器（module bundler）。
当 Webpack 处理应用程序时，它会递归地构建一个依赖关系图（dependency graph），其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
所以，它的本质是一个模块打包器，其工作是将每个模块打包成相应的 bundle。

## Webpack 核心概念

* mode：模式。对应有开发模式、生产模式等
* entry：入口
* output：出口
* loader：模块转换器，用于把模块原内容按照需求转换成新内容。Webpack 对于 .jpg、.txt 等内容无法处理，就需要 file-loader、url-loader 等进行协助处理。
* plugins：扩展插件，在 Webpack 构建流程中的特定时机注入拓展逻辑来改变构建结果或者做其他你想做的事情。

## entry

指定打包⼊口文件，有三种不同的形式：string | object | array。
一对一：一个入口、一个打包文件

``` js
module.exports = {
    entry: './src/index.js'
}
```

多对一：多个入口、一个打包文件

``` js
module.exports = {
    entry: [
        './src/index1.js',
        './src/index2.js',
    ]
}
```

多对多：多个入口、多打包文件

``` js
module.exports = {
    entry: {
        'index1': "./src/index1.js",
        'index2': "./src/index2.js"
    }
}
```

## output

* 可以指定一个固定的文件名称，如果是多入口多出口（entry 为对象），则不能使用单文件出口，需要使用下面的方式
* 通过 Webpack 内置的变量占位符：[name]

``` js
module.exports = {
    ...,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        filename: "[name].js"
    }
}
```

## loader

loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行。
先处理 less-loader，再处理 css-loader，最后处理 style-loader。

``` js
module.exports = {
    //...
    module: {
        rules: [{
            test: /\.(le|c)ss$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            exclude: /node_modules/,
        }, ],
    },
};
```

### 关于文件处理常见的 loader

* file-loader：当引入的文件是 .png、.txt 等时，可以通过 file-loader 解析项目中的 url 引入。根据配置将文件拷贝到相应的路径，并修改打包后文件的引入路径，让它指向正确的文件。
* url-loader：url-loader 封装了 file-loader 且可以不依赖于 file-loader 单独使用，并且可以配置 limit。对小于 limit 大小的图片转换成 Base64，大于 limit 的时候使用 file-loader 里的方法。

### 关于语法检查常见 loader

* tslint-loader：通过 TSLint 检查 TypeScript 代码。
* eslint-loader：通过 ESLint 检查 JavaScript 代码。

### 关于 HTML 代码处理常见的 loader

* html-withimg-loader：处理 HTML 中的图片。

###  关于 CSS 代码处理常见的 loader

* style-loader：动态创建 style 标签，将 CSS 代码插入到 head 中。
* css-loader：负责处理 @import、url 等语句。例如 import css from 'file.css'、url(image.png)。
* postcss-loader：负责进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等。
* less-loader：将 .less 文件内容转换成 CSS。
* sass-loader：将 .sass 文件内容转换成 CSS。

###  关于 JS 代码处理常见的 loader

* babel-loader：将 JS 代码向低版本转换，我们需要使用 babel-loader。
* ts-loader：将 TypeScript 转换成 JavaScript。

## plugin

### 常见 plugin

* clean-webpack-plugin：打包前自动清理 dist 目录，防止文件残留。
* copy-webpack-plugin：将单个文件或者整个目录复制到构建目录
* mini-css-extract-plugin：将 CSS 抽离出来单独打包并且通过配置可以设置是否压缩。
* html-webpack-plugin：这个插件可以配置生成一个 HTML5 文件，其中 script 标签包含所有 Webpack 包。如果你设置多个入口点，你可以据此实现多页面应用打包。

### 提高效率的 plugin

* webpack-dashboard：可以更友好的展示相关打包信息。
* webpack-merge：提取公共配置，减少重复配置代码
* speed-measure-webpack-plugin：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
* size-plugin：监控资源体积变化，尽早发现问题
* HotModuleReplacementPlugin：模块热替换

## loader 和 plugin 的区别

* Loader

Loader 本质上就是一个函数，对接收到的内容进行转换，返回转换后的结果。
因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对不同类型的资源进行处理。
就好比 file-loader 或者 url-loader，配置之后就可以正确引用 png 等格式的图片、txt 等格式文件。
又好比 style-loader 以及 css-loader，引用后就可以对 CSS 内容进行预编译处理。

* Plugin

Plugin 就是插件，就好比 jsliang 编写的 VS Code 插件一样，Plugin 拓展了 Webpack 的功能。
Plugin 就是在 Webpack 的生命周期中进行各种操作，从而达到使用者目的插件。
就好比 html-webpack-plugin，配合多入口形式使用之后，就可以实现多页面应用的功能。
又好比 clean-webpack-plugin 实现打包之前清空 dist 目录，copy-webpack-plugin 可以将单个文件或者整个目录复制到构建目录。


