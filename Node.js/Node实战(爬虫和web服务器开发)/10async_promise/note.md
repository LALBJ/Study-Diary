## 写法区别
* ES5正常写法
``` JavaScript
getAjax(url, ()=>{})
```
* Promise
``` JavaScript
get(url).then(()=>{})
```
* async await
``` JavaScript
(async ()=>{let res = await get(url)})()
```

## Promise
1. 创建类构造对象
``` JavaScript
class LcPromise{
    constructor(fn) {
        //将成功的事件函数集成在successList数组里
        this.successList = []
        //这里将所有的失败函数集成在failList里面
        this.failList = []
        //pending,fullfilled,rejected
        this.state = "pending"
        //传入的函数对象,(异步操作的函数内容)
        fn(this.resolveFn.bind(this),this.rejectFn.bind(this))
    }
}
```

构造函数的作用:
* 声明成功函数放置的数组对象
* 声明失败函数放置的数组对象
* 定义初始化状态
* 调用传入进行执行异步内容的函数

2. 传入成功或失败时的函数
``` JavaScript
class LcPromise{
    constructor(fn) {
        //将成功的事件函数集成在successList数组里
        this.successList = []
        //这里将所有的失败函数集成在failList里面
        this.failList = []
        //pending,fullfilled,rejected
        this.state = "pending"
        //传入的函数对象,(异步操作的函数内容)
        fn(this.resolveFn.bind(this),this.rejectFn.bind(this))
    }
    then(successFn,failFn){
        if(typeof successFn == 'function'){
            this.successList.push(successFn)
        }
        if(typeof failFn == 'function'){
            this.failList.push(failFn)
        }
    }
    catch(failFn){
        if(typeof failFn=='function'){
            this.failList.push(failFn)
        }
    }
}
```

作用：
* 将成功和失败的函数传入值成功和失败的数组里

3. 定义调用成功和失败的函数
``` JavaScript
class LcPromise{
    constructor(fn) {
        //将成功的事件函数集成在successList数组里
        this.successList = []
        //这里将所有的失败函数集成在failList里面
        this.failList = []
        //pending,fullfilled,rejected
        this.state = "pending"
        //传入的函数对象,(异步操作的函数内容)
        fn(this.resolveFn.bind(this),this.rejectFn.bind(this))
    }
    then(successFn,failFn){
        if(typeof successFn == 'function'){
            this.successList.push(successFn)
        }
        if(typeof failFn == 'function'){
            this.failList.push(failFn)
        }
    }
    catch(failFn){
        if(typeof failFn=='function'){
            this.failList.push(failFn)
        }
    }
    resolveFn(res){
        this.state = "fullfilled"
        this.successList.forEach(function(item,index){
            item(res)
        })
    }
    rejectFn(res){
        this.state = "rejected"
        this.failList.forEach(function(item.index){
            item(res)
        })
        throw Error(res)
    }
}
```

作用：
* 成功时调用成功数组里的所有函数，失败时调用失败数组里的所有函数