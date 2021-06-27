let path = require('path')

//获取当前执行文件的目录
console.log(__dirname)
//获取当前的执行文件
console.log(__filename)
console.log(path.extname(__filename))
//解析路径，可以将路径信息解析出来
console.log(path.parse(__filename))