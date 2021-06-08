function reactive(target = {}) {
  if (!isObject(target)) {
    // 如果传入的target不是对象，那么直接返回该对象即可
    return target;
  }
  const proxy = new Proxy(target, {
    get(target, key) {
      console.log("get", key);
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log("set", value);
      return Reflect.set(target, key, target[key]);
    },
    deleteProperty(target, key) {
      console.log(`delete key is ${key}`);
    },
  });

  return proxy;
}

const effectStack = []; // 如果存在多个effect，则依次放入栈中

function effect(fn) {
  fn();
}

const isObject = (val) => val !== null && typeof val === "object";
