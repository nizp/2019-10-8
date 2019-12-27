### webpack
    - *模块化*打包工具，进行一些浏览器不能识别的语法的*编译*（让浏览器识别）
    - 重点:如何配置（有兴趣可以研究一下优化）
    - 难点:敲的少，不敢解决报错（因为报错都是英文）
    - 核心:入口(entry),输出(output),loader,插件(plugins),dev-server(服务器配置)

    - 遵循的是commonjs规范(node)

> 通过入口文件，分析所有文件的依赖关系

### 使用webpack

- 安装 
    - npm install webpack -g (全局安装)
    - 新建一个文件夹（这个文件夹不要是中文&&不能叫webpack） npm init -y
    - npm install --save-dev webpack (局部安装)  yarn add webpack --dev(局部安装)
    ```
        package.json中找到scripts
        "scripts": {
            "dev":"webpack"
        }
        npm run dev     yarn run dev
    ```
    - 手动创建一个 webpack.config.js 文件
    - mode: production生产模式（打包上线，压缩）  development开发环境（码农要的）


    ES6 -> ECMAScript6 -> ECMAScript2015 +

    - 是 JavaScript 语言的下一代标准
    - ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等


### loader
    - loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块

### dev-server
    - webpack-dev-server


```
    包含
    include: [
        path.resolve(__dirname, "app")
    ],
    排除
    exclude: [
        path.resolve(__dirname, "app/demo-files")
    ],
    // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
    // test 和 include 具有相同的作用，都是必须匹配选项
    // exclude 是必不匹配选项（优先于 test 和 include）
    // 最佳实践：
    // - 只在 test 和 文件名匹配 中使用正则表达式
    // - 在 include 和 exclude 中使用绝对路径数组
    // - 尽量避免 exclude，更倾向于使用 include

```


### ES6模块
    - 引入 
        import ..  from  '路径'
    - 导出
        export 要导出的内容

> 第一种写法:
    ```
        import 随意取名字 from  '路径'
        export default xxx

        注意的是一个文件中只能有一个default，不然就报错
    ```

> 第二种写法:
     ```
        import {固定的名字，跟导出的名字一致} from  '路径'
        export {xxx} 

        如果需要改名字，那么使用as
            比如:
                import {ary as arr} from  '路径'
                arr就是ary

            导如的时候可以使用*来导入，但是必须要用as换个名字
            比如:
                import * as aaa from  '路径'
                就等同于把路径中的所有内容都获取出来了，并且是一个对象

                aaa.xxx去拿对象里面的值，如果是default，要用aaa.default.xxx拿
    ```














