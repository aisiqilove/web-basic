class MVVM {
    constructor(options) {
        // 挂载在实例
        this.$el = options.el;
        this.$data = options.data;
        // 如果有模版就编译
        if (this.$el) {
            // 数据劫持
            new Observer(this.$data);
            // 代理
            this.proxyData(this.data);
            // 用数据和元素编译
            new Compile(this.$el, this);
        }
    }
    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get () {
                    return data[key];
                },
                set(newValue) {
                    data[key] = newValue;
                }
            })
        })
    }
}

