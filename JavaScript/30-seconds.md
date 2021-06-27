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