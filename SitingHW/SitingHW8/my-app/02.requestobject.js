
const http = require('http')
const server = http.createServer()
//req is a  requestobject, including the data and atriubut relevant to client
server.on('request',(req,res)=>{
    // req.url is the url addr that the client request fot
    const url = req.url
    //req.methos is the nethod tyope that client request for
    const method = req.method
    const str = `your request url is ${url}, and requeta methos is ${method}`
    console.log(str)
    //call res.end() method ,to respond some content to client
    res.end(str)
})
server.listen(80,() =>{
    console.log(`server running at http://127.0.0.1`)
})