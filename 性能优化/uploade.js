const Router = require('koa-router')
const multer = require('koa-multer');

const storage = multer.diskStorage({
  destination: 'uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate(),
  filename (ctx, file, cb) {
    cb(null, Date.now() + '-' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + '-' + file.originalname);
  }
});

// 指定文件上传的目录
const upload = multer({
  storage
});

const router = new Router({
  prefix: '/v1/upload'
})

const CodeConfig = {
  error: 0, // 请求失败
  success: 1, // 请求成功
}

router.post('/', upload.single('file'), async (ctx) => {
  // 获取上传文件对象
  // console.log(ctx.req.file);
  ctx.body = 'success';
})

module.exports = router