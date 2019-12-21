const http = require('http');
const fs = require('fs');


/*
    注册:
    /register?user=123   
        有没有这个人
        失败
            {
                code:0,
                msg:'有介个银了'
            }

        成功
            {
                code:1,
                msg:'可以注册'
            }
        
    localhost/register?user=123 
    localhost/index2.html


    /register

    
*/

function queryString(str){    
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g,($0,$1,$2)=>{
        obj[$1] = $2;
    });
    return obj;
}

let sql = [
    {
        id:0,
        username:'彭锦程',
        password:123
    },
    {
        id:1,
        username:'尹德智',
        password:321
    },
    {
        id:2,
        username:'李淑磊',
        password:123
    },
    {
        id:3,
        username:'tony',
        password:123
    }
];
http.createServer((req,res)=>{

    let url = req.url;
    if(url !== '/favicon.ico'){
        
        if(url.includes('/post')){
            //接口
            // let opt = queryString(); // user=123&
            let html = '';
            //post是一段一段传输的
            //传输的过程中触发的
            req.on('data',(data)=>{
                html += data;
                // console.log(data)
            });
            //传输完触发
            req.on('end',()=>{
                let opt = queryString(html);
               
                let msg = {
                    code:0,
                    msg:'可以注册'
                }
                let o1 = sql.find(item=>item.username === decodeURI(opt.user));
                //查下有没有这个人
                if(o1){
                    msg.code = 1;
                    msg.msg = '有这个人了';
                }
                res.setHeader('content-type','text/html;charset=utf-8');
                res.write(JSON.stringify(msg));
                res.end();
                
            })
            
            console.log('来了');


        }else{
            //文件

            try {
                if(url === '/'){
                    url = '/index.html';
                }
                let data = fs.readFileSync('www'+url);
                res.write(data.toString());
                res.end();
            } catch (error) {
                let data = fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end();
            }
        }
    }
}).listen(80);