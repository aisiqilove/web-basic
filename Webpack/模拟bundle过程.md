``` js
// 模块是否有依赖，有的话，记录依赖的路径
// 处理模块的内容 编译

// {
//  模块依赖图谱
// }

/***** 创建webpackbootstrap 函数
(function (moudles) {
     补齐缺失的函数和属性
 })({ 模块依赖图谱 });
****/
```

<!-- webpack.config.js -->

``` js
const path = require("path");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
    },
    mode: "development",
};
```

<!-- bundle.js -->

``` js
const webpack = require("./lib/webpack.js");
const options = require("./webpack.config.js");
new webpack(options).run();
```

<!-- lib/webpack.js -->

``` js
const fs = require('fs')
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require('@babel/core');

module.exports = class webpack {
    constructor(opt) {
        const {
            entry,
            output
        } = opt
        this.entry = entry
        this.output = output
        this.modules = []
    }
    run() {
        // 入口函数
        const info = this.parse(this.entry)
        // console.log(info)
        this.modules.push(info);

        for (let i = 0; i < this.modules.length; i++) {
            const item = this.modules[i]
            const dependencies = item.dependencies
            if (dependencies) {
                for (let j in dependencies) {
                    this.modules.push(this.parse(dependencies[j]));
                }
            }
        }

        // 数据格式转换 arr to obj
        const obj = {};
        this.modules.forEach((item) => {
            obj[item.entryFile] = {
                dependencies: item.dependencies,
                code: item.code,
            };
        });
        this.file(obj);
    }
    parse(entryFile) {
        // 读取入口文件
        const content = fs.readFileSync(entryFile, "utf-8")
        // console.log(content)

        // 来帮助我们分析内部的语法，包括es6，返回⼀个ast抽象语法树
        // 获取代码ast
        const ast = parser.parse(content, {
            sourceType: 'module'
        })
        // console.log(ast.program.body)

        const dependencies = {};
        //根据body里面的分析结果，遍历出所有的引⼊模块
        //分析ast抽象语法树，根据需要返回对应数据，
        //根据结果返回对应的模块，定义⼀个数组，接受⼀下node.source.value的值
        traverse(ast, {
            ImportDeclaration({
                node
            }) {
                // console.log(node)
                const newFilename = './' + path.join(path.dirname(entryFile), node.source.value)
                // console.log(path.dirname(entryFile))
                // console.log(path.join(path.dirname(entryFile), node.source.value))
                // const content = fs.readFileSync(newFilename, 'utf-8')
                // console.log(content)
                dependencies[node.source.value] = newFilename;
            }
        })

        // console.log(dependencies)

        const {
            code
        } = babel.transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        });

        return {
            entryFile,
            dependencies,
            code
        }
    }
    file(obj) {
        // 1. 生成bundle文件（需要从output配置字段拿到文件的存储位置和文件的名称）
        const bundlePath = path.join(this.output.path, this.output.filename);
        const newObj = JSON.stringify(obj);
        const content = `(function(modules){
      // lalala 代码生成了
      function require(module){
          // ./a.js ---> 是否可以拿到这个模块的code?
         
          function newRequire(relativePath){
              // 就是把相对于入口模块的路径替换成相对根目录的路径
             return require(modules[module].dependencies[relativePath])
          }
          const exports = {};
          (function(exports,require,code){
              eval(code)
          })(exports,newRequire,modules[module].code)

          return exports;
      }
      require('${this.entry}')
  })(${newObj})`;
        fs.writeFileSync(bundlePath, content, 'utf-8')
    }
}
```
