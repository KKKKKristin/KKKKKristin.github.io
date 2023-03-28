//1.import http
const http = require('http')
//2.create web server
const server= http.createServer()
//3. bind request event
server.on('request', function(req,res){
    console.log('someone visit our web server')
})

//4. start up server
server.listen(8080, function(){
    console.log('server running at http://127.0.0.1:8080')
})