const express = require('express');
const router = express.Router();

/*
    router的根不是localhost是  /noloading/
*/
router.get('/',(req,res)=>{
    setTimeout(() => {
        res.json({code:1})
    }, 3000);
});

module.exports = router; //导出路由

