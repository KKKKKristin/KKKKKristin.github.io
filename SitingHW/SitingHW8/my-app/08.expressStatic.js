const express = require('express')
const app = express()

//use express.static('./clock')
app.use(express.static('./clock'))

app.listen(80,() => {
    console.log('express serer running at http://127.0.0.1')
})