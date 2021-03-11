const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function MyPromise (fn) {
  let that = this
  that.status = PENDING
  that.value = null
  that.reason = null

  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  const resolve = (value) => {
    if (that.status !== PENDING) return;
    setTimeout(() => {
      that.status = RESOLVED
      that.value = value
      that.resolvedCallbacks.forEach(cb => cb(value))
    })
  }
  const reject = (reason) => {
    if (that.status !== PENDING) return;
    setTimeout(() => {
      that.status = REJECTED
      that.reason = reason
      that.rejectedCallbacks.forEach(cb => cb(reason))
    })
  }

  fn(resolve, reject)

}
// 1.回调函数延迟绑定 2.链式调用
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 成功回调不传给它一个默认函数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
  // 对于失败回调直接抛错
  onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
  let bridgePromise;
  let that = this;
  if (that.status === PENDING) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      that.resolvedCallbacks.push((value) => {
        try {
          // 看到了吗？要拿到 then 中回调返回的结果。
          let x = onFulfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e);
        }
      });
      that.rejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  if (that.status === RESOLVED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (that.status === REJECTED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  return that
}
// 3.捕获异常
MyPromise.prototype.catch = function (onRejected) {
  onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
  return this.then(null, onRejected)
}

function resolvePromise (bridgePromise, x, resolve, reject) {
  //如果x是一个promise
  if (x instanceof MyPromise) {
    // 拆解这个 promise ，直到返回值不为 promise 为止
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject);
      }, error => {
        reject(error);
      });
    } else {
      x.then(resolve, reject);
    }
  } else {
    // 非 Promise 的话直接 resolve 即可
    resolve(x);
  }
}