const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.post('/',(req,res)=>{
//    console.log(req.files);
   let files = req.files;

   files.forEach(file=>{
        let oldpath = path.resolve(file.path);
        let newpath = path.resolve(file.destination,file.originalname);
        fs.renameSync(oldpath,newpath);
   });

   res.json({code:1,msg:'成功'});
   
});

module.exports = router; //导出路由

