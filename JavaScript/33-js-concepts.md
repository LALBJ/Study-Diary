# 33-js-concepts

[toc]

## 调用栈

![img](https://miro.medium.com/max/374/1*ZSFHnq9iMHIApVLcgwczPQ.png)

1. 调用栈：是一个记录所有函数调用的数据结构。当我们调用一个函数去执行的时候，把一些内容加入到堆栈；当我们从函数中返回时，再从栈顶弹出

   ![img](https://miro.medium.com/max/750/1*E3zTWtEOiDWw7d0n7Vp-mA.gif)

   错误堆栈跟踪，也遵循了堆栈的顺序

   ![img](https://miro.medium.com/max/875/1*JctnBGRAYmQQPeMsgXUi0A.png)

2. 堆：对象分配在了堆中。所有分配给变量和对象的内存都发生在这里。
3. 队列：JS运行时包含一个消息队列，它是要处理的消息列表和要执行的相关回调函数

### 事件循环

![img](https://miro.medium.com/max/875/1*-MMBHKy_ZxCrouecRqvsBg.png)