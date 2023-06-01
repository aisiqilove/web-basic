
// 树

class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor() {
        this.root = null
    }
    insert(key) {
        let newNode = new Node(key)
        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }
    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }
    // 中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }
    // 先序遍历
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)
    }
    preOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }
    // 后序遍历
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback)
    }
    postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }
    // 层序遍历
    levelOrderTraverse(callback) {
        let queue = []
        queue.push(this.root)
        while (queue.length) {
            let node = queue.shift()
            callback(node.key)
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
    }
    // 最小值
    min() {
        return this.minNode(this.root)
    }
    minNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left
            }
            return node.key
        }
        return null
    }
    // 最大值
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right
            }
            return node.key
        }
        return null
    }
    // 搜索
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        if (node === null) {
            return false
        }
        if (key < node.key) {
            return this.searchNode(node.left, key)
        } else if (key > node.key) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }
    // 删除
    remove(key) {
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        if (node === null) {
            return null
        }
        if (key < node.key) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // 第一种情况：一个叶节点
            if (node.left === null && node.right === null) {
                node = null
                return node
            }
            // 第二种情况：一个只有一个子节点的节点
            if (node.left === null) {
                node = node.right
                return node
            } else if (node.right === null) {
                node = node.left
                return node
            }
            // 第三种情况：一个有两个子节点的节点
            let aux = this.findMinNode(node.right)
            node.key = aux.key
            node.right = this.removeNode(node.right, aux.key)
            return node
        }
    }
    findMinNode(node) {
        while (node && node.left !== null) {
            node = node.left
        }
        return node
    }

}