//this is a router module

//1. import express
const express = require('express')
//2. create router object
const router = express.Router()

//3.load router
router.get('/user/list',(req, res)=>{
    res.send('get user list')
})

router.post('/user/add',(req,res)=>{
    res.send('add new user')
})

//4.export module router object
module.exports = router