class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if (this.el) {
            // 如果这个元素能获取到 才编译
            // 1.先把真实dom放到内存中 fragment
            let fragment = this.node2fragment(this.el);
            // 2.编译=> 提取想要到元素节点 v-model 文本节点{{}}
            this.compile(fragment);
            // 3.把编译好到fragment appendChild页面
            this.el.appendChild(fragment);
        }
    }
    /* 辅助方法 */

    // 判断节点
    isElementNode(node) {
        return node.nodeType === 1;
    }

    // 判断指令
    isDirective(name) {
        return name.includes('v-');
    }

    /* 核心方法 */

    /**
    * 将node转化成fragment
    * @param el 元素
    */
    node2fragment(el) {
        // 文档碎片 内存中到dom节点
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }

    /**
    * 通过compileUtil方法编译元素
    * @param node node节点
    */
    compileElement(node) {
        // 带 v-
        let attrs = node.attributes;  // 去当前节点到属性
        Array.from(attrs).forEach(attr => {
            // 判断属性名中有v-
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                // 取对应到值 放到节点中
                let expr = attr.value;
                let [, type] = attrName.split('-');
                // node vm.$data expr
                // todo ......
                compileUtil[type](node, this.vm, expr);
            }
        })
    }

    /**
    * 通过compileUtil方法编译文本
    * @param node node节点
    */
    compileText(node) {
        // {{}}
        let expr = node.textContent; // 取文本中到内容
        let reg = /\{\{([^}]+)\}\}/g; // {{a}} {{b}} {{c}}
        if (reg.test(expr)) {
            // node vm.$data expr
            // todo ......
            compileUtil['text'](node, this.vm, expr);
        }
    }

    /**
    * 核心编译compile
    * @param fragment 虚拟节点 内存节点 碎片
    */
    compile(fragment) {
        // 递归 所有节点
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 元素节点 需要深入检查
                // 需要编译元素
                this.compileElement(node);
                this.compile(node);
            } else {
                // 文本节点
                this.compileText(node);

            }
        });
    }
}

compileUtil = {
    getVal(vm, expr) { // 获取实例上对应数据
        expr = expr.split('.'); // [a,b,c,d,e]
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data)
    },
    getTextVal(vm, expr) { // 获取编译文本后到结果
        return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    setVal(vm, expr, value) {
        expr = expr.split('.'); // [a,b,c,d,e]
        // 收敛
        return expr.reduce((prev, next, currentIndex) => {
            if (currentIndex === expr.length - 1) {
                return prev[next] = value;
            }
            return prev[next];
        }, vm.$data)
    },
    text(node, vm, expr) {
        let updateFn = this.updater['textUpdater'];
        // {{msg.a}} => hello MVVM
        let value = this.getTextVal(vm, expr);
        expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            new Watcher(vm, args[1], () => {
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            })
        })
        updateFn && updateFn(node, value);
    },
    model(node, vm, expr) {
        let updateFn = this.updater['modelUpdater'];
        new Watcher(vm, expr, (newValue) => {
            updateFn && updateFn(node, this.getVal(vm, expr));
        })
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            this.setVal(vm, expr, newValue);
        })
        updateFn && updateFn(node, this.getVal(vm, expr));
    },
    updater: { // 更新
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}