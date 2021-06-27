const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { getPackedSettings } = require('http2')

//目标：下载音乐
//1.获取音乐相关的信息，通过音乐相关的信息获取mp3地址
//2.如何获取大量的音乐信息，通过获取音乐列表操作
//3.通过音乐的分类页，获取音乐的列表
async function getPage(num){
    let httpUrl = "http://www.app-echo.com/api/recommend/sound-day?page=" + num;
    let res = await axios.get(httpUrl)
    // console.log(res.data.list)
    res.data.list.forEach((item,i) => {
        let title = item.sound.name;
        let mp3Url = item.sound.source;
        let fileName = path.parse(mp3Url).name
        let content = `${title},${mp3Url},${fileName}\n`
        fs.writeFile('music.txt', content, {flag:'a'},function(){
            console.log('写入完成:'+title)
        })
        console.log(path.parse(mp3Url))
        // console.log(title,mp3Url)
        download(mp3Url,fileName)
    });
}

async function download(mp3Url,fileName){
    let res = await axios.get(mp3Url,{responseType:"stream"})
    let filePath = fs.createWriteStream('./mp3/'+fileName+'.mp3')
    res.data.pipe(filePath)
    res.data.on('close', function(){
        filePath.close()
    })
}

getPage(1)