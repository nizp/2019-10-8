const http = require('http'),//模块化开发
fs = require('fs'),
urlModel = require('url'),//能够把url分割为路径，查询信息，hash....
qs = require('querystring'); //能够url序列化操作


const app = http.createServer((req,res)=>{
    // console.log(800);
    const {pathname,query} = urlModel.parse(req.url);
    let lastName = ['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
    // /\.js$|\.html/
    let re = new RegExp(lastName.join('|'));
    // console.log(re);
    if(pathname === '/'){
        let data = fs.readFileSync('www2/index.html');
        res.end(data.toString());
    }
});

let port = 80;

app.listen(port);

/*
    当服务器报错的时候触发
*/
app.on('error',(e)=>{
    console.log(e);
    //端口被占用的错误
    if(e.code === 'EADDRINUSE'){
        port ++;
        console.log(port)
        app.listen(port)
    }
})
