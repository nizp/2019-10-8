### 如何才能请求到数据？

https://www.baidu.com

> URI URL(地址) URN(名字)

> fetch('/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=es6阮一峰')

> fetch('/get?user=name')   http://localhost:80/get?user=name   

> fetch('/post')  http://localhost:80/post

1.js
let data = []
script src="1.js"

data

fetch('./data.json')

fetch('/get?page=3')

### Node
    Node是基于chromeV8引擎，能够让js运行在服务端，通过npm去下载功能模块包
    js 能够写前端也能写后端，是真正实现前后统一的全栈工程师
    webpack

    Deno

    学习目标:
        能够知道后端做了什么事
        学会写接口
        为了更好的理解前端内容

    语法是不用学的,因为都是js

+ Node的特性
    - 单线程
    - 非阻塞I/O
    - 事件驱动

    node擅长处理高密集I/O,高并发的业务，写一些小工具，前端小玩具

    node中没有 BOM DOM


+ NodeJS使用的是commonjs规范(AMD规范 requirejs  CMD sea.js)
    - 引入
        require('文件') -> 返回值是一个对象，可以通过解构的方式拿到想要的模块
        不加路径的情况:
            - node自带模块
            - node_modules中的模块
    - 导出
        module.exports = {
            a:xx,
            b:xxx
        }

- http 模块 为了创建一个服务
- http.createServer(function(request,response){}).listen(80)
    - request获取客户端发送给服务器的信息
        - url 请求地址，地址上面有参数 ，还要个需要注意的是/favicon.ico
    - response服务器发送给客户端的信息
        - write(写字符串)
        - end() 结束本次会话

- fs 文件系统
    - readFile(读的文件地址,回调函数(失败,文件数据))  //异步用的回调
    - readFileSync(读的文件地址) //同步，如果读取失败会报错，所有使用try包一下

    - writeFile   添加文件
    - writeFileSync

    - unlink  删除文件
    - mkdir 添加文件夹


不管请求是找页面还是找接口，都是通过一个url的方式与后端进行交互，在访问服务器的时候最好就把要访问服务器要做什么事说清楚

<!-- open('post','/post?user=123') -->









    




    