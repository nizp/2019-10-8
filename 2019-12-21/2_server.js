const http = require('http');
const fs = require('fs');

http.createServer(function(req,res){
    //http://localhost/index.html
    // console.log(req.url); //  /index.html  /index2.html

    // fs.readFile('1.txt',function(err,data){
    //     if(err){
    //         res.write('404');
    //         res.end();
    //     }
    //     // console.log(data.toString());
    //     res.write(data.toString());
    //     res.end();
    // })

    try {
        let url = req.url;
        if(url === '/'){
            url = '/index.html';
        }
        let data = fs.readFileSync('www/'+url); //如果是某个文件夹下的文件，要加路径
        res.write(data.toString());
        res.end();
    } catch (error) {
        let data = fs.readFileSync('www/404.html'); 
        res.write(data.toString());
        res.end();
    }
   

    // console.log(data.toString());

}).listen(80);