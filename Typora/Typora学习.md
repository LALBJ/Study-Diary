## Typora学习

[TOC]

## 实时显示

输入内容实时显示。
并且通过`ctrl+/`实现源代码格式与渲染结果显示的切换

## 块元素

### 段间距和行间距

使用`Return`实现段间距的切换

使用`Shift` + `Return`实现行间距的切换，但是为了避免出现在其他markdown工具中这种写法被忽视，可以在结尾留两个空格或者使用`<br/>`

### 标题

在行头使用1-6个`#`来实现1-6个级别的标题

### 块引用

> 通过`>`实现块引用

### 列表

* 通过`*`
* 实现无序列表

- 或者通过`+`与`-`来实现

+ Nice

1. 通过`数字` + `.`实现序号列表

### 任务列表

- [x] 使用`[ ]`或者`[X]`实现任务列表
+ [ ] 但是要注意前面要加上无序列表

### 代码块

三个反引号，在反引号后添加语言类型会提供语法高亮

### 数学公式

通过在`$$`中插入Latex语句实现公式

### 表格

| 第一列 | 第二列 | 第三列 |
| -----: | :----: | ------ |
|        |        |        |
|        |        |        |
|        |        |        |

在Typora中创建表格只需要 `| Header | Header |`就可以完成自动创建  
注意观察源代码中的左对齐、居中对齐等的写法

### 脚注

脚注的示例[^footnote].

[^footnote]: Here is the *text* of the **footnote**.

### 横向规则

通过`---`与`***`创建横线

### 内容列表

通过`[toc]`实现设置目录列表

## 行内元素

### 链接

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

`[]`中为文字内容，`()`中为链接，并且可以在后面通过双引号为链接加上悬浮标题

``` markdown
This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.
```
内部链接（[内部链接](#行内元素)）

引用链接：

``` markdown
This is [an example][id] reference-style link.

Then, anywhere in the document, you define your link label on a line by itself like this:

[id]: http://example.com/  "Optional Title Here"

[Google][]
And then define the link:

[Google]: http://google.com/
```

### URLs

`<i@typora.io>`变为了<i@typora.io>

通过typora会自动创建Url，如果链接格式标准。比如，www.google.com

### 图片

图片和链接有相似的语法，但是需要在前面加上!

可以直接从本地文件或者网站上的图片拖拽到typora中实现图片插入

![img](https://typora.io/img/favicon-64.png)

图片路径为相对路径，并且可以设置`typora-root-url`为文件路径的默认根路径

### 强调（斜体）

使用`*`或者`_`括住内容

不过在一些场景下`_`会被使用为代码或者名字，这时`_`就不能实现斜体效果了，而是直接渲染出来

> wow_great_stuff
>
> wow_great_stuff

因此建议使用`*`

而为了在文字中正常使用`*`可以使用反转义符

\*this text is surrounded by literal asterisks\*

### 加粗

使用`**`或者`__`加粗

### 代码

想要在行内使用代码，可以使用(`)括住代码

Use the `printf()` function.

### 删除线

使用`~~`添加删除线

~~Mistaken text.~~

### 下划线

下划线通过原生的HTML代码实现

`<u>Underline</u>` becomes <u>Underline</u>.

### 表情

通过编辑的最后一个选项选择表情

:smile:

### 行内数学公式

`$`括住内容即可

### 上标注、下标注及高亮

`~`下标注

H~2~O

`^`上标注

X^2^

`==`高亮

==hightlight==

### HTML

[GFM]: https://help.github.com/articles/github-flavored-markdown/

