const express = require('express')
const app = express()

//routing
// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

// app.post('/',(req,res)=>{
//     res.send('post request')
// })

//import router module
const router = require('./11.router')
//register router module
app.use('/api',router)


app.listen(80,() => {
    console.log('http://127.0.0.1')
})