//1.导入express
const express = require('express')
//2.创建web服务器
const app = express()
//4 监听客户端的get和post请求，并向客户端响应具体的内容
app.get('/user',(req,res)=>{
   //call ecpress res.send(), to resond a json object
    res.send({name:'zs', age:20, gender:'male'})
})

app.post('/user',(req, res)=>{
//调用express提供的res.send9）方法向客户端提供一个文本字符串
res.send('success!')
})

//5.
app.get('/',(req,res)=>{
//通过req.query可以获取到客户端发宋过来的查询参数
//！！！默认情况下，req.query是一个空对象
    console.log(req.query)
    res.send(req.query)
})
//这里的：id是一个动态参数
app.get('/user/:id',(req,res)=>{
    //req.param是动态匹配到的url参数
    
        console.log(req.params)
        res.send(req.params)
    })
//3启动web服务器
app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1')
})