var express = require('express');
var router = express.Router();
const fs = require('fs'); //文件操作

/* 
  /user

  /user/list
  
*/

router.post('/add',(req,res)=>{
  const data = JSON.parse(fs.readFileSync('./json/user.json'));
  const {user,pass} = req.body;

  const obj = data.find(item=>item.name === user);
  //有说明用户名被占用，没有就说明可以添加
  if(!obj){
    data.push({
        "name":user,
        pass
    });
    fs.writeFileSync('./json/user.json',JSON.stringify(data))
    res.json({
      code:0,
      msg:'添加成功'
    })
  }else{
    res.json({
      code:1,
      msg:'用户名被占用'
    })
  }

  console.log(req.body)
  
  
  // console.log(JSON.parse(data.toString()).length);

})

router.get('/list', function(req, res, next) {
  console.log('123')
  // res.send('hehe')
  const data = fs.readFileSync('./json/user.json');
  res.send(data.toString())
  // console.log(data)
});

module.exports = router;
