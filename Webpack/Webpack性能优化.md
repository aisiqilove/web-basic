## Webpack性能优化

Webpack 的优化瓶颈，主要是 2 个方面：

* Webpack 的构建过程太花时间
* Webpack 打包的结果体积太大

## 针对 Webpack 本身构建优化

### 优化 resolve.modules 配置

resolve.modules 用于配置 Webpack 去哪些目录下寻找第三方模块，默认是 ['node_modules']
但是，它会先去当前目录的 ./node_modules 查找，没有的话再去 ../node_modules，最后到根目录 —— 即 npm 查找包的规则。

``` js
resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
}
```

### 优化 resolve.extensions 配置

在导入没带文件后缀的路径时，Webpack 会自动带上后缀去尝试询问文件是否存在，而 resolve.extensions 用于配置尝试后缀列表；默认为 extensions:['js', 'json']。
当遇到 require('./data') 时 Webpack 会先尝试寻找 data.js，没有再去找 data.json；如果列表越长，或者正确的后缀越往后，尝试的次数就会越多。
在配置时为提升构建优化需遵守：

1. 频率出现高的文件后缀优先放在前面。
2. 列表尽可能的少，例如只有 3 个：js、jsx、json。
3. 书写导入语句时，尽量写上后缀名。

### 优化 resolve.include/exclude 配置

以 babel-loader 为例，可以通过 include 和 exclude 帮助我们避免 node_modules 这类庞大文件夹。
即通过 include 告诉 Webpack 哪些我们是需要检测的，通过 exclude 告诉 Webpack 哪些我们是不需要检测的（例如已经收拾过的静态资源）

## 通过 Loader 和 Plugin 优化

### 缓存

* cache-loader

在 babel-loader 开启 cache 后，将 loader 的编译结果写进硬盘缓存，再次构建如果文件没有发生变化则会直接拉取缓存。

* uglifyjs-webpack-plugin

通过这个插件也可以解决缓存问题。

### 多进程

由于有大量文件需要解析和处理，构建是文件读写和计算密集型的操作，特别是当文件数量变多后，Webpack 构建慢的问题会显得严重。
文件读写和计算操作是无法避免的，那能不能让 Webpack 同一时刻处理多个任务，发挥多核 CPU 电脑的威力，以提升构建速度呢？
Happypack 可以将任务分解成多个子进程去并发执行，大大提升打包效率。
除此之外 thread-loader 和 Happypack 一样，但是配置比较简单。

### 多进程压缩

因为自带的 UglifyjsWebpackPlugin 压缩插件是单线程运行的，而 TerserWebpackPlugin 可以并发运行压缩功能（多进程）。
所以通过 TerserWebpackPlugin 代替自带的 UglifyjsWebpackPlugin 插件。 webpack v5 自带最新的TerserWebpackPlugin。

### 静态资源分离

通过 DllPlugin 或者 Externals 进行静态依赖包的分离。
由于 CommonsChunkPlugin 每次构建会重新构建一次 vendor，所以出于效率考虑，使用 DllPlugin 将第三方库单独打包到一个文件中，只有依赖自身发生版本变化时才会重新打包。

### 代码分离

SplitChunksPlugin

### 打包资源压缩

* JS 压缩：UglifyjsWebpackPlugin
* HTML 压缩：HtmlWebpackPlugin
* CSS 压缩：MiniCssExtractPlugin
* 图片压缩：image-webpack-loader
* Gzip 压缩：不包括图片
