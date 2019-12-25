const express = require('express');
const router = express.Router();





/*
    router的根不是localhost是  /login2/
*/
router.post('/',(req,res)=>{
    const {body,sql} = req;
    let o = sql.find(item=>item.name === body.name);
    let obj = null;
    if(o){
        req.session.userinfo = o.name;
        req.session.type = o.type;
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
});

module.exports = router; //导出路由

