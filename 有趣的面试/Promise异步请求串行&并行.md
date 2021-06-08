# Promise 异步请求串行&并行执行

## 问题一

- 给定一个数组 urls，里面保存着一组请求的 url。通过调用一个 getResponse(url)方法 发送异步请求。该方法返回值为一个 promise。

```js
var urls = ["url1", "url2", "url3", "url4"];
const getResponse = (url) => {
  return new Promise((resolve, reject) => {
    console.log("参数为：", url);
    setTimeout(() => {
      console.log("异步请求后结果为", "afeter" + url);
      resolve("success");
    }, 1000);
  });
};
```

