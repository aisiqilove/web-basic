//  栈：先进后出 乒乓球盒
//  队列：先进先出 排队买票

class Stack {
    constructor() {
        this.stack = []
    }
    push(item) {
        this.stack.push(item)
    }
    pop() {
        this.stack.pop()
    }
    peek() {
        return this.stack[this.getCount() - 1]
    }
    getCount() {
        return this.stack.length
    }
    isEmpty() {
        return this.getCount() === 0
    }
}

let stack = new Stack() // {stack: []}
stack.push('第一条数据') // {stack: ['第一条数据']}
stack.push('第二条数据') // {stack: ['第一条数据', '第二条数据']}

class Queue {
    constructor() {
        this.queue = []
    }
    enQueue(item) {
        this.queue.push(item)
    }
    deQueue() {
        this.queue.shift()
    }
    getHeader() {
        return this.queue[0]
    }
    getLength() {
        return this.queue.length
    }
    isEmpty() {
        return this.getLength() === 0
    }
}

let queue = new Queue() // {queue: []}
queue.enQueue('第一条数据') // {queue: ['第一条数据']}
queue.enQueue('第二条数据') // {queue: ['第一条数据', '第二条数据']}
queue.deQueue() // {queue: ['第二条数据']}
queue.getHeader() // '第二条数据'
queue.getLength() // 1
queue.isEmpty() // false