const express = require('express');
const router = express.Router();

/*
    router的根不是localhost是  /login/
*/
router.post('/',(req,res)=>{
    // console.log(req.body);
    setTimeout(() => {
        res.json({code:0})
    }, 2000);
});

module.exports = router; //导出路由

