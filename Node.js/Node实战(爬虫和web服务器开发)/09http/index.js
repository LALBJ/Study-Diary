let http = require('http')

//创建server对象
let server = http.createServer()
//监听对当前服务器对象的请求
server.on('request',function(req,res){
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    //当服务器被请求时，会触发请求事件，并传入请求对象和响应对象
    console.log(req.url,req.headers)
    //res.end('helloworld')
    if(req.url == '/'){
        res.end("<h1>首页</h1><img src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'/>")
    }else if(req.url == '/gnxw'){
        res.end('<h1>国内新闻</h1>')
    }else if(req.url == '/ylxw'){
        res.end('<h1>娱乐新闻</h1>')
    }else{
        res.end("<h1>访问出错</h1>")
    }
})
//服务器监听的端口号
server.listen(3000,function(){
    //启动监听端口号成功时触发
    console.log("服务器启动成功！")
})