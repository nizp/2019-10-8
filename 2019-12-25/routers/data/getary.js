const express = require('express');
const router = express.Router();

/*
    router的根不是localhost是  /getary/
*/
router.get('/',(req,res)=>{
    setTimeout(() => {
        res.json({code:0,ary:[1,2,3,4]})
    }, 4000);
});

module.exports = router; //导出路由

