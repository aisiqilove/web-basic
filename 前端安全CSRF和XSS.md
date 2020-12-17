1.iframe
<!-- <iframe sandbox="value"></iframe> -->
防御：设置sandbox属性限制

2.opener
<!-- 1) HTML -> <a target='_blank' href='http://www.baidu.com'>
 2)  JS  -> window.open('http://www.baidu.com') -->
window.opener.location.replace('https://www.baidu.com')
防御：a标签这是属性rel="noopener noreferrer nofollow"
window.open
<!-- <button onclick='openurl("http://www.baidu.com")'>click跳转</button> -->
function openurl(url) {
var newTab = window.open(); 
newTab.opener = null; 
newTab.location = url; 
}

3. CSRF（跨站请求伪造）

原理：攻击者盗用了你的身份，以你的名义进行恶意请求。 如cookie中信息
防御：token验证、验证码

4. XSS（跨站脚本攻击）

原理：攻击者在目标网站植入恶意脚本（js / html），用户在浏览器上运行时可以获取用户敏感信息（cookie / session）、修改web页面以欺骗用户
防御：1. 转义 HTML 2. HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。

3. 验证码：防止脚本冒充用户提交危险操作。

5. ClickJacking（点击劫持）

原理：利用透明 iframe 覆盖原网页诱导用户进行某些操作达成目的。
防御：1. HTTP投中加入 X-FRAME-OPTIONS属性 DENY：不能被所有网站嵌套或加载；SAMEORIGIN：只能被同域网站嵌套或加载；ALLOW-FROM URL：可以被指定网站嵌套或加载。

2. 判断当前网页是否被 iframe 嵌套（详情在第一条 firame 中）

6. HSTS（HTTP严格传输安全）

告诉浏览器只能通过HTTPS访问当前资源, 禁止HTTP方式。
限制：1.url不能是ip 2. 只能在80 和 443端口之间转换

7. CND劫持

原理：攻击者劫持了CDN，或者对CDN中的资源进行了污染，攻击者可以肆意篡改我们的前端页面，对用户实施攻击。
防御：1. 支持SRI，script 和 link 标签有了新的属性 integrity 通过验证获取文件的哈希值是否和你提供的哈希值一样来判断资源是否被篡改。
使用 SRI 需要两个条件：一是要保证 资源同域 或开启跨域，二是在script中 提供签名 以供校验。这个属性也存在兼容问题
