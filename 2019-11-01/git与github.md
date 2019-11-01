# git与github

- git:版本控制工具
    之前有个老项目运行还不错，但是觉得技术比较陈旧，设计的风格也比较古老，所以公司决定更新迭代，当程序员开发完成之后，测试的是也没问题，但是上线的时候新网站挂了，问你怎么办？    

    新的挂了，老的正常运行，那么就是先让老版本回滚回来，等新版本的网站确认没问题再次上线即可。

    版本的时光穿梭

- github:网站、远程代码管理仓库、贵圈基友平台（交流、学习）


### 集中式  vs  分布式

    集中式缺点:
        必须联网、比较慢、都使用一个中央服务器，有可能会造成数据丢失

    分布式:
        不用联网就能进行版本控制，速度快

    
### 初始化版本控制状态
    找到要控制的文件目录，鼠标右键，找到 git bash here 点击

    打开控制台，输入git init

    版本控制都是基于.git这个隐藏文件的，如果不小心把.git文件删除，那么就不能进行版本控制了

    查看git状态
        git status
    
    通过Tab键补全文件

    通过ll或者ls查看目录的文件

    通过上下键去切换刚才输入命令


### 设置作者信息
    - 设置用户名      git config --global user.name "你的名字" （这个名字想好，英文的）
    - 设置邮箱        git config --global user.email "你的邮箱" (能够收到邮件的邮箱)


    工作区到暂存区
        git add 指定文件名

        git add .  把当前目录的所有文件都放到暂存
        
    暂存区到版本区
        git commit -m "注释(你能直接识别的注释即可)"

    快速把工作区的代码放到版本区（已经被管理过的文件）
        git commit -a -m "注释" 
            注意:
                上面这个命令，前提条件是文件已经提交过一次才可以使用

    查看版本：
        git log
        git reflog   （如果版本操作的多使用这个命令）


    查看每个区域的不同点:

        工作区跟暂存区的区别:
            git diff

        工作区跟版本区的区别:
            git diff master

        暂存区跟版本区的区别:
            git diff --cached



## 过滤指定文件
    - 创建一个 .gitignore的文件
    - touch .gitignore  (创建文件)
    - 配置过滤项
        https://www.cnblogs.com/zhihang/p/10611475.html（过滤项规则，也可以再网上找找别的）
        /create.txt
        node_modules/


    +  如果说配置不起作用，可以先把之前的操作清除一下，再过滤操作
        清除命令
            git rm -r --cached .


    撤销回滚:
        git reset --hard 版本ID

# github
    其实有很多代码托管平台，github只是其中一个，有码云、coding....


    把我们的代码放到远程仓库

    1.在github上创建一个项目

    2.绑定秘钥
        ssh-keygen -t rsa -C "邮箱名"  （绑一次即可）

    3.确定版本库是最新的（没有东西可以提交了）

    4.查看远程仓库:
        git remote -v  (使用git init的时候是查不出来东西)

    5.添加远程仓库
        git remote add origin（这个名字是可以改变的） git@github.com:nizp/19-11-01.git

    6.git pull origin master  (保证能够成功上传，进行远程和本地相合并)

    7.git push origin master   上传（第一次会出现让输入用户名和密码）

    
# node
    NPM 跟着node安装一起安装下来的模块

    NPM 是目前世界上最大的资源管理平台

    Yarn 最快的资源管理平台
        npm install yarn -g



    创建项目:
        npm init -y  会生成一个package.json的文件，这个文件里面放的时候所有的项目配置依赖

    如何下载资源呢？
        npm install 资源名 
            -g 全局安装
            -S 项目依赖

        下载下来的时候会自动生成一个node_modules的文件夹，文件夹中放的就是你需要的资源


    









        












    


        




    


    

   

    

    









    
    


    





