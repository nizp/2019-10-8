### webpack
    - *模块化*打包工具，进行一些浏览器不能识别的语法的*编译*（让浏览器识别）
    - 重点:如何配置（有兴趣可以研究一下优化）
    - 难点:敲的少，不敢解决报错（因为报错都是英文）
    - 核心:入口(entry),输出(output),loader,插件(plugins),server(服务器配置)

    - 遵循的是commonjs规范(node)

> 通过入口文件，分析所有文件的依赖关系

### 使用webpack

- 安装 
    - npm install webapck -g (全局安装)
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








