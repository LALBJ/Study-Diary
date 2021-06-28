# 30-seconds-javascript

[toc]

## for循环，数组reduce方法和方法链

### for循环

``` javascript
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
let filePaths = [];

for (let file of files) {
  const fileName = file.trim();
  if(fileName) {
    const filePath = `~/cool_app/${fileName}`;
    filePaths.push(filePath);
  }
}

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']
```

* 不符合当今写法，函数式编程目前更加流行
* 迭代可以跳过和提前结束
* O(N)复杂度

### 数组reduce

``` javascript
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
const filePaths = files.reduce((acc, file) => {
  const fileName = file.trim();
  if(fileName) {
    const filePath = `~/cool_app/${fileName}`;
    acc.push(filePath);
  }
  return acc;
}, []);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']
```

* 更加符合函数式编程写法
* 不能跳过循环或者提前返回

### 方法链

``` javascript
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
const filePaths = files
  .map(file => file.trim())
  .filter(Boolean)
  .map(fileName => `~/cool_app/${fileName}`);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']
```

* 更加符合函数式编程写法
* 更加易读和重构，方法链可以进行拓展
* O(cN)复杂度，c每个元素的迭代次数，链的长度

## indexOn `从一个数组中构建对象，并指定键`

* 通过对象解构将，数组中的除键外的值赋值给data

``` javascript
const indexOn = (arr, key) =>
  arr.reduce((obj, v) => {
    const { [key]: id, ...data } = v;
    obj[id] = data;
    return obj;
  }, {});
Examples
indexOn([
  { id: 10, name: 'apple' },
  { id: 20, name: 'orange' }
], x => x.id);
// { '10': { name: 'apple' }, '20': { name: 'orange' } }
```



## JS中的迭代器

[不是很懂](https://www.30secondsofcode.org/articles/s/javascript-iterators)

## 在JS中怎么把一个可迭代的对象转换成数组

在ES6中引入了扩展运算符(`...`)，我们可以用扩展运算符将可迭代对象转换成数组

### String

``` javascript
const name = 'Zelda';
const letters = [...name]; // 'Z', 'e', 'l', 'd', 'a'
```

### Set

``` javascript
const data = [1, 2, 3, 1, 2, 4]
const values = new Set(data);
const uniqueValues = [...values]; // [1, 2, 3, 4]
```

### NodeList

NodeList是一系列节点的集合，会由`document.childNodes()`  
与`document.querySelectorAll()`返回  
尽管NodeList实现了一些方法使他看起来很像数组(比如, `NodeList.prototype.forEach()`)  
但是他依然被转换为数组

``` javascript
const nodes = document.childNodes;
const nodeArray = [...nodes]; // [ <!DOCTYPE html>, html ]
```

## 将一个对象作为数组使用

常用方法`Object.keys()` , `Object.values() `以及` Object.entries()`  
使用这些方法有一个问题，就是有时会让代码非常冗长  
[本文实现好了数组常用的方法](https://www.30secondsofcode.org/articles/s/javascript-object-array-proxy)

