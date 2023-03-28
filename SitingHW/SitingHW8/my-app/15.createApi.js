//import express
const express = require('express')
//create server
const app = express()

//configure intermmedia componet
app.use(express.urlencoded({extended:false}))

//!!we have to configure jsonp before cors
app.get('/api/jsonp',(req,res)=>{
    //define jsonp api to impelimnt
const funcName = req.query.callback
const data = {name : 'za', age:21}

const scriptStr = `${funcName}(${JSON.stringify(data)})`

res.send(scriptStr)

})

// !!!we have to confige the cors for crossing domain
const cors = require('cors')
app.use(cors())


//import router module
const router = require('./16.apiRouter')
//register in app
app.use('/api',router)

//start up server
app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1')
})