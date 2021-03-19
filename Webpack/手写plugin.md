<!-- ./myPlugins/txt-webpack-plugin.js -->
``` js 
// 插件的格式
// 打印打包文件数量、文件名称
function TxtWebpackPlugin () {
  
}
TxtWebpackPlugin.prototype.apply = (compiler) => {
  //  异步钩子 tapAsync
  //  同步钩子 tap
  compiler.hooks.emit.tapAsync("TxtWebpackPlugin", (compilation, cb) => {

    console.log(compilation.entries)
    let index = 0
    let content = ''
    for(var key in compilation.assets) {
      index++
      content += key + '、'
    }
    compilation.assets["buildInfo.txt"] = {
      source: function () {
        return `打包生成文件数量${index}个。\n分别: ${content}` ;
      },
      size: function () {
        return 1024;
      },
    };

    cb();

  }); 
}
module.exports = TxtWebpackPlugin; 

```

<!-- webpack.config.js -->
``` js
const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js");

module.exports = {
  ...
  plugins: [
    ...
    new txtwebpackplugin(),
  ],
};


```
