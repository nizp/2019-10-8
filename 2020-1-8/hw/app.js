const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let ary = ['刘成','赵忠鹍'];

const jwt = require('jsonwebtoken');


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名  
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods','GET, POST') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
})


//没有实际的意义
app.get('/test',(req,res)=>{
    console.log(111);
    res.json({
        code:0,
        msg:'test'
    })
})

/*
    /login
        body:uname=xxx
*/

const secret = 'ZF';
// const token = jwt.sign({user:'刘成'},secret,{
//     expiresIn:20
// });

app.post('/login',(req,res)=>{
    const {uname} = req.body;    
    if(ary.includes(uname)){
        res.json({
            code:0,
            msg:'登录成功',
            //登录成功创建token
            token:jwt.sign({user:uname},secret,{
                expiresIn:20
            })
        })
    }else{
        res.json({
            code:1,
            msg:'失败'
        })
    }
});

//前端发送token一般不是通过body发送，而是通过headers发送的
app.post('/islogin',(req,res)=>{
    //Authorization值是可变的，一般Authorization||token,到底是哪个根据Access-Control-Allow-Headers配置来
    const token = req.headers.authorization;
    // console.log(token)
    if(token){
        jwt.verify(token,secret,(error,data)=>{
            if(error){
                res.json({
                    code:2,
                    msg:'失效'
                })
                return;
            }
            res.json({
                code:0,
                msg:'有权限',
                //每次请求验证的时候，都发一个新的令牌给前端，保证令牌持久化操作
                token:jwt.sign({user:data.user},secret,{
                    expiresIn:20
                })
            })
            
        });

    }else{
        res.json({
            code:1,
            msg:'未登录'
        })
    }
})






// console.log(token);

// jwt.verify(token,secret,(error,data)=>{
//     if(error){
//         console.log('失效')
//         return;
//     }
//     console.log(data);
// });

//jwt -> jsonwebtoken


app.listen(80);
