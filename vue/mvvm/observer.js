class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        // data 原有属性改成get set
        if (!data || typeof data !== 'object') {
            return;
        }
        // 要将数据 一一劫持 先获取到data的key和value
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
            this.observer(data[key]); // 深度递归劫持    
        })
    }
    // 定义响应式
    defineReactive(obj, key, value) {
        let that = this;
        let dep = new Dep(); // 每个变化的数据 都会对应一个数组 这个数组是存放所有更新操作
        Object.defineProperty(obj, key, {
            enumerable: true,   // 可枚举
            configurable: true, // 
            get() {
                // todo ......
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set(newValue) {
                if (newValue != value) {
                    // this 不是实例
                    that.observer(newValue); // 如果是对象继续劫持
                    value = newValue;
                    dep.notify();  // 数据更新
                }
            }
        })
    }
}

class Dep {
    constructor() {
        // 订阅数组
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}