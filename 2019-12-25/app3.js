const express = require('express');
const bodyParser = require('body-parser');//post能够用req.body
const app = express();
const multer  = require('multer');

app.use(express.static('www'));  //[1,2,3]

app.use(multer({ dest: 'uploads/'}).array('filename'));//single单个，array数组


app.use(bodyParser.json());//解决axios不能用对象的问题
app.use(bodyParser.urlencoded({extended:false}));

app.use('/upload',require('./routers/upload/upload'))

app.listen(80);