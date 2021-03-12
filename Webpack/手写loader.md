``` js
// less-loader
// 语法转换 less to css
const less = require("less");
module.exports = function(source) {
    less.render(source, (err, output) => {
        this.callback(err, output.css)
    })
};
```

``` js
// css-loader
// css 序列化
module.exports = function(source) {
    return JSON.stringify(source);
};
```

``` js
// style-loader
// 创建style
// css内容放入style
// style标签放入html的head头部
module.exports = function(source) {
    return `
      const tag = document.createElement("style");
      tag.innerHTML = ${source};
      document.head.appendChild(tag);
    `
};
```
