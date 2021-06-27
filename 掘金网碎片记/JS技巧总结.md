1.函数柯里化
``` JavaScript
const curry = (fn)=>{
    let params = []
    const next = (...args)=>{
        params = [...params,...args]
        if(params.length < fn.length){
            return next;
        }else{
            return fn.apply(fn,params)
        }
    }
    return next;
}

//使用
const sum=(a,b,c,d) => {
    return a+b+c+d;
}
const fn = curry(sum)
const res = fn(1)(2)(3)(4)
```
2.关于数组
### 手写map方法
map()方法根据回调函数映射一个新数组
``` JavaScript
Array.prototype.map = function(fn){
    const result = []
    for(let i=0; i<this.length; i++){
        if(!this.hasOwnProperty(i)) continue;//处理稀疏数组的情况
        result.push(fn(this[i],[i],this))
    }
    return result
}
//使用
const arr = [1,2,3,4]
const mapArr = arr.map(item=>item*2)
console.log(mapArr)
```

### 手写filter方法
filter()方法返回一个数组，返回的每一项是在回调函数中执行结果true
``` JavaScript
Array.prototype.filter = function(fn){
    const result = []
    for(let i=0;i<this.length; i++){
        if(!this.hasOwnProperty(i)) continue;
        fn(this[i],i,this) && result.push(this[i])
    }
    return result
}
//使用
const arr=[1,2,3,5]
const filterArr=arr.filter(item=>item>2)
console.log(filterArr)
```

### 手写reduce方法
reduce()方法循环迭代，回调函数的结果都会作为下一次的形参的第一个参数
``` JavaScript
Array.prototype.reduce=function(fn,initValue){
    let result = initValue?initValue:this[0]
    for(let i=initValue?1:0;i<this.length;i++){
        if(!this.hasOwnProperty(i)) continue;
        result = fn(result,this[i],this)
    }
    return result
}
//使用
const arr = [1,2,3,,5]
const reduceArr = arr.reduce((a,b)=>a*b,2)
console.log(reduceArr)
```

### 手写every方法
every()方法测试一个数组内的所有元素是否都通过某个指定函数的测试。它返回一个布尔值
``` JavaScript
Array.prototype.every=function(fn){
    let bool = true;
    for(let i=0;i<this.length;i++){
        if(!this.hasOwnProperty(i)) continue;
        if(!fn(this[i],i,this)){
            bool = false;
            break;
        }
    }
    return bool
}
// 使用
const arr = [1,2,3,5]
const everyArr = arr.every(item=>item>3)
console.log(everyArr)
```

### 手写some方法
``` JavaScript
Array.prototype.some = function(fn){
    let bool = false;
    for(let i=0; i<this.length; i++){
        if(!this.hasOwnProperty(i)) continue;
        if(fn(this[i],i,this)){
            bool = true;
            break;
        }
    }
    return bool;
}
//使用
let arr = [1,2,3,5]
let someArr = arr.some(item=>item>3)
console.log(someArr)
```

### 手写find方法
find()方法返回数组中满足提供的测试函数的第一个元素的值。否则返回undefined
``` JavaScript
Array.prototype.find=function(fn){
    let result;
    for(let i=0; i<this.length; i++){
        if(!this.hasOwnProperty(i)) continue;
        if(fn(this[i],i,this)){
            result = this[i]
            break;
        }
    }
    return result;
}
const arr = [1,2,3,5]
const findArr = arr.find(item=>item>6)
console.log(findArr)
```

### 拉平数组
* 利用ES6语法flat(num)将数组拉平，改方法默认只会拉平一层
``` JavaScript
function flattening(arr,num=1){
    if(!Array.isArray(arr)) return;
    return arr.flat(num)
}
```

* 利用reduce方法拉平数组
``` JavaScript
function flattening(arr){
    if(!Array.isArray(arr)) return;
    return arr.reduce((a,b)=>a.concat(Array.isArray(b)?flattening(b):b),[])
}
```

* 模拟栈递归
``` JavaScript
function flattening(arr){
    if(!Array.isArray(arr)){
        return;
    }
    const stack = [...arr]
    const res = []
    while(stack.length){
        let value = stack.shift()
        Array.isArray(value)?stack.push(...value):res.push(value)
    }
    return res
}
```

5. 防抖和节流

``` JavaScript
// 防抖
// fn 需要防抖的函数
// delay 防抖期待值
function debounce(fn,delay){
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn,delay)
    }
}

// 节流
// fn 需要节流的函数
// delay 节流的期待值
function throttle(fn,delay){
    let valid = true;
    return function(){
        if(!valid){
            return false;
        }
        valid = false;
        setTimeout(()=>{
            fn()
            valid = true
        },delay)
    }
}
```

6. 实现new关键字
new关键字做了以下事情
* 创建一个空对象
* 设置原型，将这个对象的原型设置为函数的prototype对象
* 让函数的this指向这个对象，并执行构造函数的代码
* 判断函数返回值类型，如果是值类型返回这个值，如果是引用类型返回引用对象

``` JavaScript
cosnt myNew = (...args)=>{
    const [fn,...other]=args;
    const target = Object.create(fn.prototype)
    const res = fn.apply(target,other)
    if(res && res === 'object' || typeof res === 'function'){
        return res
    }
    return target
}
```

7. 实现instanceof

``` JavaScript
const _instanceof = function(left,right){
    if(!left && !right) return;
    const rightPrototype = right.prototype;
    while(left = Object.getPrototypeOf(left)){
        if(left == rightPrototype) return true;
    }
    return false;
}

const obj = {a:1}
console.log(_instanceof(obj,Object))
```