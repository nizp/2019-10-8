// const express = require('express')
const express = require('./express');
const app = express()

//写get方法只是为了给指定路径订阅一个函数
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('链接成功3000端口'))