const Koa = require('koa');
const app = new Koa();
const path = require('path')
const static = require('koa-static');
// const router = require('koa-router')();
// 配置静态web服务的中间件
app.use(static(path.resolve(__dirname, "./www")));
 

app.use(require('./router/user'));

// response
// app.use(ctx => {
//     console.log(ctx.request.query);
//     ctx.body = '[1,2,3,4]';
// });
 
app.listen(80);