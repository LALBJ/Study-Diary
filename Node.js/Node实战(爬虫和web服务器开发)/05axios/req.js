let request = require('request')
let {fsWrite,fsRead,fsDir} = require('./icfs')
//console.log(axios)
let httpUrl = "https://www.1905.com/vod/list/n_1_t_1/o3p1.html"
// axios.get(httpUrl, {}).then(function(res){
//     console.log(res)
// })
function req(url){
    return new Promise(function(resolve, reject){
        request.get(url, function(err, response, body) {
            if(err){
                reject(err)
            }else{
                resolve({response, body})
            }
        })
    })
}
//获取起始页面的所有分类
async function getClassUrl(){
    let {response,body} = await req(httpUrl)
    //console.log(body)
    let reg = /<span class="search-index-L">类型(.*?)<div class="grid-12x">/igs
    //解析html内容
    let result = reg.exec(body)[1]
    //console.log(result[1])

    let reg1 = /<a href="javascript\:void\(0\);" onclick="location\.href='(.*?)';return false;" >(.*?)<\/a>/igs
    let arrClass = []
    var res
    while( res = reg1.exec(result) ){
        if(res[2]!="全部"){
            let obj = {
                className:res[2],
                url:res[1]
            }
            arrClass.push(obj)
            await fsDir('./movies/'+res[2])
            getMovies(obj.url,res[2])
        }
        
    }
    // console.log(arrClass)
    
}

//通过分类获取页面中的电影链接
async function getMovies(url,moviesType){
    let {response,body} = await req(url)
    let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)" .*?><img/igs
    let res;
    var arrList = []
    while(res = reg.exec(body)){
        //改进（使用迭代器提升性能）
        arrList.push(res[1])
        parsePage(res[1],moviesType)
    }
    //console.log(arrList)
}

async function parsePage(url,moviesType){
    let {response,body} = await req(url)

    let reg = /<h1 class="playerBox-info-name playerBox-info-cnName">(.*?)<\/h1>.*?<span id="playerBoxIntroCon">(.*?)<a/igs
    let res = reg.exec(body)
    let movie = {
        name: res[1],
        detail: res[2],
        moviesType
    }
    let strMovie = JSON.stringify(movie)
    fsWrite('./movies/'+moviesType+"/"+res[1]+".json",strMovie)
    //console.log(res[1], res[2])
}

getClassUrl()
//获取分类里的电影链接
//根据电影链接获取电影的详细信息