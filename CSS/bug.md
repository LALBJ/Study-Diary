# 开发遇到的bug们

[toc]

## CSS之Calc

calc方法中的减号必须与后面的数字之间有空格，否则会被识别为负号

``` css
/*减号与数字空开*/
width: calc(100vw - 20px);
/*这时就会产生bug*/
width: calc(100vw-20px);
```

## flex布局

flex布局需要内部设置padding-top才能将元素撑起来

``` html
<style type="text/css">
    body{
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
    }
    .main{
        flex: 1;
        margin: 0 10px;
        padding-top: 50%;
        position: relative;
        background: #999
    }
    .f{
        font-size: 20px;
        text-align: center;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    /*.main::after{
        content: 'AAAA';
        font-size: 20px;
        text-align: center;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }*/
</style>
<div class="main">
    <div class="f">AA</div>
</div>
```

