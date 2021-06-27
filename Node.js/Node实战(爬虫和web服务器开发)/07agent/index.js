const axios = require('axios')

let httpUrl = "https://www.doutula.com/article/detail/1829185"
let options = {
    proxy: {
        host: '27.38.98.16',
        port: 9000
    }
}
axios.get(httpUrl,options).then((res)=>console.log(res.data))