# js-questions

[toc]

## 1. 输出是什么？

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter()
shape.perimeter()

```

[答案](20 NaN)

注意 `diameter` 的值是一个常规函数，但是 `perimeter` 的值是一个箭头函数。

对于箭头函数，`this` 关键字指向的是它当前周围作用域（简单来说是包含箭头函数的常规函数，如果没有常规函数的话就是全局对象），这个行为和常规函数不同。这意味着当我们调用 `perimeter` 时，`this` 不是指向 `shape` 对象，而是它的周围作用域（在例子中是 `window`）。

在 `window` 中没有 `radius` 这个属性，因此返回 `undefined`。

## 2. 输出是什么？

``` javascript
+true;
!"Lydia";
```

[答案](1 false)

一元操作符加号尝试将 bool 转为 number。`true` 转换为 number 的话为 `1`，`false` 为 `0`。

字符串 `'Lydia'` 是一个真值，真值取反那么就返回 `false`。

## 3. 输出是什么？

``` javascript
let c = { greeting: 'Hey!' }
let d

d = c
c.greeting = 'Hello'
console.log(d.greeting)
```

[答案](Hello)

在 JavaScript 中，当设置两个对象彼此相等时，它们会通过*引用*进行交互。

首先，变量 `c` 的值是一个对象。接下来，我们给 `d` 分配了一个和 `c` 对象相同的引用。

[![img](https://camo.githubusercontent.com/7fa22323daec0bc9742948c600eb9d951d28488132dcfb47e181d8b0a92b5f6e/68747470733a2f2f692e696d6775722e636f6d2f6b6f356b3066732e706e67)](https://camo.githubusercontent.com/7fa22323daec0bc9742948c600eb9d951d28488132dcfb47e181d8b0a92b5f6e/68747470733a2f2f692e696d6775722e636f6d2f6b6f356b3066732e706e67)

因此当我们改变其中一个对象时，其实是改变了所有的对象。

## 4. 输出是什么？

``` javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor
    return this.newColor
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor
  }
}

const freddie = new Chameleon({ newColor: 'purple' })
freddie.colorChange('orange')

```

[答案](TypeError)

`colorChange` 是一个静态方法。静态方法被设计为只能被创建它们的构造器使用（也就是 `Chameleon`），并且不能传递给实例。因为 `freddie` 是一个实例，静态方法不能被实例使用，因此抛出了 `TypeError` 错误。

## 5. 输出是什么？

``` javascript
let greeting
greetign = {} // Typo!
console.log(greetign)

```

[答案]({})

代码打印出了一个对象，这是因为我们在全局对象上创建了一个空对象！当我们将 `greeting` 写错成 `greetign` 时，JS 解释器实际在上浏览器中将它视为 `global.greetign = {}` （或者 `window.greetign = {}`）。

为了避免这个为题，我们可以使用 `"use strict"。这能确保当你声明变量时必须赋值。

## 6. 输出是什么？

``` javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName());

```

[答案](TypeError)

你不能像常规对象那样，给构造函数添加属性。如果你想一次性给所有实例添加特性，你应该使用原型。因此本例中，使用如下方式：

```javascript
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}
```

这才会使 `member.getFullName()` 起作用。为什么这么做有益的？假设我们将这个方法添加到构造函数本身里。也许不是每个 `Person` 实例都需要这个方法。这将浪费大量内存空间，因为它们仍然具有该属性，这将占用每个实例的内存空间。相反，如果我们只将它添加到原型中，那么它只存在于内存中的一个位置，但是所有实例都可以访问它！

## 7. 事件传播的三个阶段是什么？

``` javascript
A: Target > Capturing > Bubbling
B: Bubbling > Target > Capturing
C: Target > Bubbling > Capturing
D: Capturing > Target > Bubbling
```

[答案](D)

在**捕获**（capturing）阶段中，事件从祖先元素向下传播到目标元素。当事件达到**目标**（target）元素后，**冒泡**（bubbling）才开始。

[![img](https://camo.githubusercontent.com/5fd2d347d044150e4ae35091622f0628f0eb7893966f03c8955ca271f3153e47/68747470733a2f2f692e696d6775722e636f6d2f4e31386f5267642e706e67)](https://camo.githubusercontent.com/5fd2d347d044150e4ae35091622f0628f0eb7893966f03c8955ca271f3153e47/68747470733a2f2f692e696d6775722e636f6d2f4e31386f5267642e706e67)

## 8. 输出是什么？

``` javascript
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`

```

- A: `"Lydia"` `21` `["", " is ", " years old"]`
- B: `["", " is ", " years old"]` `"Lydia"` `21`
- C: `"Lydia"` `["", " is ", " years old"]` `21`

[答案](B)

如果使用标记模板字面量，第一个参数的值总是包含字符串的数组。其余的参数获取的是传递的表达式的值！

## 9. 只有六种falsy值

* undefined
* null
* NaN
* 0
* ''
* false

当函数没有返回任何值时，即默认返回`undefined`