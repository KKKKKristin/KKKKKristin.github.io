const express = require('express')
const app = express()

//routing
app.get('/',(req,res)=>{
    res.send('hello world')
})

app.post('/',(req,res)=>{
    res.send('post request')
})

app.listen(80,() => {
    console.log('express serer running at http://127.0.0.1')
})