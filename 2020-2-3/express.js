const http = require('http');
const url = require('url');
//路由规则
//路由订阅池
const router = [
    //默认对象（什么都不匹配的时候）
    {
        path:'*',
        method:'*',
        handler(req,res){
            res.end('404');
        }
    }
];

/*
    {
        path:'/',
        method:'get',
        handler(req,res){

        }
    }
*/

function express(){
    return {
        //将匹配到路径的对应方法调用
        get(path,handler){
            router.push({
                path,
                handler,
                method:'get'
            })
        },
        //启动服务
        /*
            req可以拿到客户端输入的地址和router中的每个对象去对比，如果router的对象中有
            和客户端输入的地址一致，那么就执行对应的handler方法
        */
        listen(...arg){
            const server = http.createServer((req,res)=>{
                res.send = function(txt){
                    res.end(txt);
                } 
                const {pathname} = url.parse(req.url);
                console.log(req.method);
                for(let i=1;i<router.length;i++){
                    const {path,method,handler} = router[i];
                    if(path === pathname && method === req.method.toLowerCase()){
                        return handler(req,res);
                    }
                }

                router[0].handler(req,res);

            });

            server.listen(...arg);
        } 
    }
}

module.exports = express;