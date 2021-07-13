import React from 'react'
import { renderToString } from 'react-dom/server'
import Koa from 'koa'
import App from '../src/App'
import Router from 'koa-router';
import serve from 'koa-static';

const app = new Koa();
const router = Router();
app.use(serve('build'))

router.get('/', function (ctx, next) {
  const content = renderToString(App);
  var html = `
    <html>
       <head>
         <title>ssr</title>
       </head>
       <body>
         <div id="root">${content}</div>
         <script src="bundle.js"></script>
       </body>
     </html>
    `;
  ctx.body = html;
})
app.use(router.routes());

app.listen(8002, () => {
  console.log('909: ssr 开启 ')
})