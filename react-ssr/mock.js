// import Koa from 'koa'
// import Router from 'koa-router';
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = Router();

router.get('/api/user/info', function (ctx) {
  ctx.body = {
    code: 0,
    data: {
      name: '创意云',
      best: 'CSIG'
    }
  }
})

router.get('/api/course/list', function (ctx) {
  ctx.body = {
    code: 0,
    list: [
      { name: 'web全栈', id: 1 },
      { name: 'js高级', id: 2 },
      { name: 'web小白', id: 3 },
      { name: 'java架构师', id: 4 },
    ]
  }
})

app.use(router.routes());

app.listen(9999, () => {
  console.log('mock启动完毕')
})