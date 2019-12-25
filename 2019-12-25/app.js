const express = require('express');
const bodyParser = require('body-parser');//post能够用req.body
const app = express();

let sql = [
    {
        id:-1,
        name:'zy'
    },
    {
        id:0,
        name:'lilei',
        type:0
    },
    {
        id:1,
        name:'zzk',
        type:1
    },
    {
        id:2,
        name:'ydz',
        type:9
    }

]

app.use(express.static('www'));  //[1,2,3]
app.use(bodyParser.json());//解决axios不能用对象的问题
app.use(bodyParser.urlencoded({extended:false}));
app.post('/login',(req,res)=>{
    console.log(req.body);
    setTimeout(() => {
        res.json({code:0})
    }, 2000);
});


app.post('/login2',(req,res)=>{
    const {body} = req;
    let o = sql.find(item=>item.name === body.name);
    let obj = null;
    if(o){
        obj = {
            code:0,
            type:o.type,
            user:o.name
        }
    }else{
        obj = {
            code:1
        }
    }
    res.json(obj);
})

app.get('/getary',(req,res)=>{
    setTimeout(() => {
        res.json({code:0,ary:[1,2,3,4]})
    }, 4000);
})
app.get('/noloading',(req,res)=>{
    setTimeout(() => {
        res.json({code:1})
    }, 3000);
})


app.listen(80);