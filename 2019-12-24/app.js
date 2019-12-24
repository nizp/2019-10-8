const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require("express-session");

app.use(express.static('www')); //中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: '12期',
    name: 'session_id',
    cookie: {maxAge: 10000},
    resave: false,
    saveUninitialized: true,
    rolling:true //刷新cookie重置时间
}))

let sql = [
    {
        id:0,
        user:'yindezhi',
        pw:'123'
    }
];

//失焦判断用户名是否存在
const userFn = (req,res)=>{
    const {body} = req;
    let re = /^[a-zA-Z]\w{5,11}$/;
    let msgObj = {};
    if(body.user && re.test(body.user)){
        let o = sql.find(item=>item.user === body.user);
        if(o){
            msgObj.code = 1;
            msgObj.msg = '用户名已存在';
        }else{
            msgObj.code = 0;
            msgObj.msg = '可以注册';
        }
    }else{
        msgObj.code = 2;
        msgObj.msg = '请正确输入用户名';
    }
    res.json(msgObj);

}
app.post('/getName',userFn);

//注册
app.post('/register',(req,res)=>{
    const {body:{user,pw}} = req;
    let re = /^[a-zA-Z]\w{5,11}$/;
    let msgObj = {};
   
    if(user && pw && re.test(user)){
        let o = sql.find(item=>item.user === user);
        if(o){
            msgObj.code = 1;
            msgObj.msg = '用户名已存在';
        }else{
            msgObj.code = 0;
            msgObj.msg = '注册成功';
            sql.push({
                id:Date.now(),
                user,
                pw
            })
        }
    }else{
        msgObj.code = 2;
        msgObj.msg = '请正确输入用户名';
    }
    res.json(msgObj);
});


//登录
app.post('/login',(req,res)=>{
    let msgObj = {};
    const {body:{user,pw}} = req;
    if(user && pw ){
        let o = sql.find(item=>item.user === user);
        if(o){  //说明有这个人，但是密码还没核对
            if(o.pw === pw){
                msgObj.code = 0;
                msgObj.msg = '登录成功';
                req.session.userinfo = user;
            }else{
                msgObj.code = 3;
                msgObj.msg = '用户名或密码错误';
            }
        }else{
            msgObj.code = 1;
            msgObj.msg = '此用户没有注册';
        }
    }else{
        msgObj.code = 2;
        msgObj.msg = '请核对用户信息';
    }
    res.json(msgObj);
});

//判断是否登录
app.get('/islogin',(req,res)=>{
    if(req.session.userinfo){ //登录过
        res.json({
            code:0,
            msg:'欢迎回来',
            user:req.session.userinfo
        })
    }else{
        res.json({
            code:1,
            msg:'没有登录'
        })
    }
    // console.log(req.session.userinfo);
});

//退出
app.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        console.log(err);
    });
    res.send({
        code:0
    });
})


//多并发
app.get('/a',(req,res)=>{
    setTimeout(() => {
        res.json({user:'pjc'})
    }, 2000);
})

app.get('/b',(req,res)=>{
    setTimeout(() => {
        res.json({iphone:'123456'})
    }, 5000);
});

app.get('/c',(req,res)=>{
    let {user,iphone} = req.query
    if(user=='pjc'&& iphone=='123456'){
        res.json({
            code:0
        })
    }else{
        res.json({
            code:1
        })
    }
    
});





let prot = 80;

app.listen(prot);



app.use('*',(req,res)=>{
    let data = fs.readFileSync(path.resolve('./www/404.html'));
    res.send(data.toString());
});






// app.on('error',(e)=>{
//     console.log(e,11111);
// })
// app.listen(prot);
// console.log(app)


