var express = require('express');
var router = express.Router();


let person = [
  'tony',
  'dida',
  'pjc',
  'pl',
  '尹德智'
];

router.post('/', function(req, res, next) {
  let obj = {
    code:0,
    msg:'有介个银了啦!'
  }
  let json = req.body;
  console.log(req);
  if(!person.includes(json.user)){
      obj.code = 1;
      obj.msg = '木有介个银!';
  }
  setTimeout(function(){
    res.send(JSON.stringify(obj));
  },5000)
 
});

module.exports = router;
