# jquery 
    - 如果你用的少，毕业之后就是不会(要学会，必须多敲)

    - 是一个js的类库，它简化了DOM操作，动画操作，兼容性，数据请求操作。

    - https://www.jquery123.com/ 中文网

    - 1.72左右的版本

    -(安装) npm init -y   生成一个package.json文件

    - npm install jquery -D

    - jquery有多个版本
        源码版（学习版）：jquery.js  
        压缩版:jquery.min.js

    - 引入jquery <script src="./node_modules/jquery/dist/jquery.min.js"></script>

###  选择器

 $ -> jquery对象

 $() -> fn()  函数调用

 css如何去选择，jq就如何去选择

```
    $('#box')  获取id
    $('li')  获取所有li元素
    $('.active') 获取所有的.active元素
    $('#ul1 li')
    $('input[type="button"]')  属性选择器
    $('input[type!="button"]')
    $('li:even')   偶数，js从0开始计数
    $('li:odd')   奇数，js从0开始计数

    $(':button')  伪类选择器（获取type为button的元素）

    $('div:eq(0)')  代表找第1个div

```

### 属性操作
    - attr  -> getAttribute,setAttribute
    - removeAttr   -> removeAttribute
    - prop  -> 表单的状态布尔值（表单元素用）
    - val   -> value
    - html()     -> innerHTML
    - text()    -> innerText

### 样式操作
    - css()   设置行间的样式 -> style

    $('#box').css('width')   -> 获取style的宽度
    $('#box').css('width',200) -> 设置宽度
     $('#box').css({
        'width':200,
        'background':'red'
     })      
                    -> 批量添加

    显示:  show()
    隐藏:  hide()

### jquery对象转原生对象，原生对象转jquery对象

```
    原生对象转jquery只需要包$()即可

    box - >  $(box)  就变成了jquery对象


    jquery对象转原生对象

    $box ->  $box.get(0)  ||  $box[0]

             
```


