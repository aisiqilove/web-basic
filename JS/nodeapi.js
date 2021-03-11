const Koa = require('koa');
const app = new Koa();
const items = [{ id: 1, title: 'title1' }, { id: 2, title: 'title2' }]
var data = {'data':'world'};
app.use(async (ctx, next) => {
  if (ctx.path === '/api/jsonp') {
    const { cb, id } = ctx.query;
    // const title = items.find(item => item.id == id)['title']
    var title = 'title'
    console.log(cb)
    ctx.body = `${cb}(${JSON.stringify(data)})`;
  }
})
console.log('listen 4443...')
app.listen(4443);