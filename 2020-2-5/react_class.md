# React

    - 用于构建用户界面的 JavaScript 库 -- 专注于视图层（顶多算一个MVC中的V层）

    - 生态(react-native) 、背景大

### 如何学习呢？
    - JSX语法
        JS XML
    - 组件化（受控组件和非受控组件）
    - 生命周期函数

### 安装环境
    - npx create-react-app my-app


### 引包
    ```
        import React from 'react';
        import ReactDOM from 'react-dom';


        ReactDOM.render(元素|组件|React.createElement(),挂载点,挂载成功的回调)
    ```

### react语法
```
    class的方式去声明一个组件render中return后的内容就是模板

    this.state 存放数据的
    this.setState({})  专门跟新数据的
```


### JSX语法
    ```
        组件的第一个字母一定要大写
        单标签必须要有结束符
        顶层只能有一个组件
        凡是带class的要变成className
    ```



