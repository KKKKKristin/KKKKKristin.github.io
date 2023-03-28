const http = require('http')
const server = http.createServer()

server.on('request',(req,res)=>{
    //1获取请求的url地址
    const url = req.url

    //2.设置默认的响音内容为404
    let content = '404 not found!'
    //3判断用户强求是否为/ ｜｜ index.html
    //4判断用户请求是否为about.html
    if(url === '/' || url === '/index,html'){
        content = `<h1>main page</h1>`
    }else if(url === '/about.html'){
    content = '<h1>about page<h1/>'
    }

      //5shiyong res.end()吧内容相应给客户端
      res.end(content)
})

server.listen(80,() =>{
    console.log(`server running at http://127.0.0.1`)
})
    
  
