## WebSocket

WebSocket 是 HTML5 新增的一种全双工通信协议，客户端和服务器基于 TCP 握手连接成功后，两者之间就可以建立持久性的连接，实现双向数据传输。
WebSocket并不是全新的协议，而是利用了HTTP协议来建立连接。

其他特点包括：

1. 建立在 TCP 协议之上，服务器端的实现比较容易。
2. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
3. 数据格式比较轻量，性能开销小，通信高效。
4. 可以发送文本，也可以发送二进制数据。
5. 没有同源限制，客户端可以与任意服务器通信。
6. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

## WebSocket 和 HTTP

HTTP协议是一个请求－响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。换句话说，浏览器不主动请求，服务器是没法主动发数据给浏览器的。
这样一来，要在浏览器中搞一个实时聊天，在线炒股（不鼓励），或者在线多人游戏的话就没法实现了，只能借助Flash这些插件。

HTTP协议其实也能实现:

### 轮询 

轮询是指浏览器通过JavaScript启动一个定时器，然后以固定的间隔给服务器发请求，询问服务器有没有新消息。这个机制的缺点一是实时性不够，二是频繁的请求会给服务器带来极大的压力。

### 长轮询 

长轮询模式下，客户端向服务器发出请求，服务器在没有消息的情况下，服务器并不一定会立即回应客户端，，等到有消息了再回复。这个机制暂时地解决了实时性问题，但是它带来了新的问题：

1. 以多线程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大地浪费服务器资源。
2. 当服务器更新频率较快，服务器向客户端发送数据后，必须等待下一次请求才能将新的数据发出，这样客户端接收新数据就有一个最短时间间隔。

### WebSocket客户端的简单示例

[点击这里看运行结果](http://jsbin.com/muqamiqimu/edit?js,console)

``` js
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) {
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
    console.log("Received Message: " + evt.data);
    ws.close();
};

ws.onclose = function(evt) {
    console.log("Connection closed.");
};
```

### 基于示例的Websocket握手请求如下：

客户端请求

``` 

GET / HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Host: echo.websocket.org
Origin: https://null.jsbin.com
Sec-WebSocket-Key: P+y8wAqXzfdQEwUspNsAfg==
Sec-WebSocket-Version: 13
```

服务器回应

``` 

HTTP/1.1 101 Web Socket Protocol Handshake
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Location: wss://echo.websocket.org/
```

Connection 必须设置 Upgrade，表示客户端希望连接升级。
Upgrade 字段必须设置 Websocket，表示希望升级到 Websocket 协议。
Sec-WebSocket-Key 是随机的字符串。
Sec-WebSocket-Version 表示支持的 Websocket 版本。
WebSocket 是应用层协议。

### 服务端实现

常用的 Node 实现有以下三种。

* µWebSockets
* Socket. IO
* WebSocket-Node

不熟悉，就不详细介绍了。
