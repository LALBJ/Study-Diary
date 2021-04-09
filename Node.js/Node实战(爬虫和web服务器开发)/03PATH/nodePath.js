let path = require("path")
let fs = require('fs')
//console.log(path)

let strPath = "http://www.xinhuanet.com//2019/a.jpg"
//获取路径信息的扩展名
let info = path.extname(strPath)
//console.log(info)

let arr = ['/sxt', 'qianduyan', 'zhongji']
let info1 = path.resolve(...arr)
//console.log(info1)

//console.log(__dirname)
let info2 = path.join(...[__dirname, 'sxt', 'qianduan', 'zhongji'])
// console.log(info2)

let str = "http://www.sxt.com/xinwen/guonei.html"

let arrParse = str.split('/')
console.log(arrParse, arrParse[4])
let arr2 = arrParse.slice(arrParse.length-2, arrParse.length)
console.log(arr2)

let filePath = path.join(...[__dirname, ...arr2])
// console.log(filePath)
fs.readFile(filePath, {encoding:'utf-8'}, function(err, data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }

})