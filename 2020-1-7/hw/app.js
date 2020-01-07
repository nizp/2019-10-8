const express = require('express');

const app = express();
var session = require("express-session");

app.use(session({
    secret: 'zf',
    cookie: {maxAge: 10000},
    resave: false,
    saveUninitialized: true
}));


let ary = [
    {
        un:'白伟',
        pass:'123'
    },
    {
        un:'尹德智',
        pass:'123'
    }
];

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


const router = express.Router();
const router2 = express.Router();

app.use('/login',router.get('/',(req,res)=>{
    const {uname,pass} = req.query;
    if(ary.some(item=> item.un === uname && item.pass === pass )){
        req.session.username = uname;
        res.json({
            code:0,
            msg:'成功'
        })
    }else{
        res.json({
            code:1,
            msg:'失败'
        })
    }
}));


app.use('/islogin',router2.get('/',(req,res)=>{
    console.log(req.session.username)
    if(req.session.username){
        res.json({
            code:0
        })
    }else{
        res.json({
            code:1
        })
    }
}))

app.listen(80);

