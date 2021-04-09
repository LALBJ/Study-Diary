let fs = require('fs')
const { resolve } = require('path')
function fsRead(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,{flag:'r',encoding:'utf-8'}, function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
function fsWrite(path,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(path,content,{flag:'a',encoding:'utf-8'},function(err){
            if(err){
                reject(err)
            }else{
                resolve(err)
            }
        })
    })
}
function fsDir(path){
    return new Promise(function(resolve,reject){
        fs.mkdir(path,function(err){
            if(err){
                reject(err)
            }else{
                resolve("成功创建目录")
            }
            
        })
    })
}
module.exports = {fsRead,fsWrite,fsDir}