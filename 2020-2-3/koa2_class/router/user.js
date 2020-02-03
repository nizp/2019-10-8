const router = require('koa-router')();

router.get('/user',async (ctx,next)=>{  
    ctx.response.body = '{"code":0}';
});

module.exports = router.routes();