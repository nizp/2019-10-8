/*
    http://www.expressjs.com.cn/
    1.安装:
        npm install express -S

    2.引包
*/
const express = require('express');
const app = express();
const bp = require('body-parser');
const fs = require('fs');

/*
    中间件:
        功能增强
*/

app.use(bp.urlencoded({ extended: false })); //解析urlencoded

let u = express.static('www');
app.use(u);//静态文件

/*
    req,res 都是二次封装的对象
*/
app.get('/login',(req,res)=>{
    console.log(req.query);
    if(req.query.user === 'xxx'){
        // res.json({
        //     code:1,
        //     msg:'哈哈'
        // });
        res.send({
            code:1,
            msg:'哈哈'
        });
    }
});

app.post('/register',(req,res)=>{
    console.log(req.body);
});

// app.get('*', function(req, res){
//     console.log('可能是404');
//     let a = fs.readFileSync('www/404.html');
//     // res.send(a);
//     res.end(a.toString());
// });


app.listen(80);