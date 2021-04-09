## max-width\min-width\max-height\min-height
1. min-width用来限制元素最小宽度，max-width用来限制元素最大宽度
2. min-width,max-width的的权重高
    * 当元素设置了这两个属性的时候，即使在width后面使用了！important，如果元素实际宽度没在min-width,max-width的范围内，也不会显示width的值
3. min-width与max-width的值冲突
    * 当min-width与max-width的值冲突的时候，元素最终的宽度显示min-width的值。
4. 利用max-width可以实现元素逐渐变宽的效果
    ```
    div{
        max-width: 0;
        overflow: hidden;
        transition: max-width 0.25s;
    }
    div.active {
        max-width: 600px; 
    }
    ```

# 内联级元素
    * 内联元素的CSS属性往往具有继承特性，混合一起导致CSS解析规则非常复杂。这就是内联元素比块级元素解析更难理解的原因--其是多个属性共同作用的结果。