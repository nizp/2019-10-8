### mpvue  能使用vue的语法来写小程序，最后通过命令去编译成指定小程序应用

-   vue的脚手架版本(cli)，一般都是3.0的，mpvue是基于VUE-cli2.0开发的,所以需要安装一个2.0的cli脚手架
    - npm install -g @vue/cli-init

-    vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev


- 启动命令之后,在项目的文件夹下会多一个dist的文件夹，这个文件夹就是小程序的源文件

## 跳转路由的时候，实测跳转的路由地址不能被tabar引用

## vue中的文件是如何配置的？
```
    一个配全的页面有4个文件
    必须的是2个文件
        vue（文件名最好叫index，如果不叫有可能不能编译出vue.wxml文件）,
        main.js（主要就是引入vue文件）
            import Vue from 'vue';
            new Vue(App).$mount()

    次要的文件
        store.js  使用了vuex(这个文件是可以放到全局下的[建议放到全局])（store记得使用compunted来监听）
        main.json 小程序里面的配置，用来覆盖全局的公共样式

```