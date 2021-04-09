const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const url = require('url')
const path = require('path')
//获取HTML文本文档相关的内容,与Jquery操作相同
let httpUrl = 'https://www.doutula.com/article/list/?page=1'
//获取页面总数
async function getNum(){
    res = await axios.get(httpUrl)
    let $ = cheerio.load(res.data)
    let liLength = $('.pagination li').length
    let pageNum = $('.pagination li').eq(liLength-2).find("a").text()
    //console.log(pageNum)
    return pageNum
}

//爬取所有页面
async function spider(){
    //获取页面总数
    let allPageNum = await getNum()
    for(let i=1;i<=allPageNum;i++){
        getListPage(i)
    }

}
async function getListPage(pageNum){
    let curHttpUrl = 'https://www.doutula.com/article/list/?page=' + pageNum
    let res = await axios.get(curHttpUrl)
    // console.log(res.data)
    // cheerio解析文档
    let $ = cheerio.load(res.data)
    //获取当前页面所有表情链接
    $('#home .col-sm-9>a').each((i,element)=>{
        let pageUrl = $(element).attr('href')
        let title = $(element).find('.random_title').text()
        let reg = /(.*?)\d/igs;
        title = reg.exec(title)[1]
        fs.mkdir('./img/'+title,function(err){
            if(err){
                console.log(err)
            }else{
                console.log("成功创建目录"+'./img/'+title)
            }
        })
        //console.log(title)
        parsePage(pageUrl,title)
    })
}
//获取链接
// axios.get(httpUrl).then((res)=>{
//     // console.log(res.data)
//     // cheerio解析文档
//     let $ = cheerio.load(res.data)
//     //获取当前页面所有表情链接
//     $('#home .col-sm-9>a').each((i,element)=>{
//         let pageUrl = $(element).attr('href')
//         let title = $(element).find('.random_title').text()
//         let reg = /(.*?)\d/igs;
//         title = reg.exec(title)[1]
//         fs.mkdir('./img/'+title,function(err){
//             if(err){
//                 console.log(err)
//             }else{
//                 console.log("成功创建目录"+'./img/'+title)
//             }
//         })
//         //console.log(title)
//         parsePage(pageUrl,title)
//     })
// })

async function parsePage(url,title){
    let res = await axios.get(url);
    let $ = cheerio.load(res.data)
    $('.pic-content img').each((i,element)=>{
        let imgUrl = $(element).attr('src')
        console.log(imgUrl)
        let extName =  path.extname(imgUrl)
        //图片写入路径和名字
        let imgPath = `img/${title}/${title}-${i}${extName}` 
        //创建写入图片流
        let ws = fs.createWriteStream(imgPath)
        axios.get(imgUrl,{responseType:'stream'}).then(function(){
            res.data.pipe(ws)
            console.log("图片加载完成:"+imgPath)
            //关闭写入流
            res.data.on('close', function(){
                ws.close()
            })
        })
        
    })
}

spider()