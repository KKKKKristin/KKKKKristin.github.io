

//start the server
const express = require('express')
const router = express.Router()

//load router
router.get('/get',(req,res)=>{
    //req.query response to client
    const query = req.query
    //res.sent(), response
    res.send({
        status:0,//0 suscess, 1 failed
        msg:'get request success!',
        data: query // the dada to respond to the client
    })
})

//define post api
router.post('/post',(req,res)=>{
    // req.body get url-encoded data
    const body = req.body
    res.send({
        status: 0 ,
        msg:'post success!!',
        data: body
    })
})

module.exports = router