const router = require('express').Router();
const verify = require('./verifytoken');

router.get('/ambilpengabsen',verify,(req,res)=>{
    res.send(req.user.data);
})

module.exports=router;