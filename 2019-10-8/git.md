### git与github

> git 版本控制工具

A模块
A.1模块
A.2模块
....
Axxxxx模块
B模块


SVN：集中式
    弊端:版本控制必须需要网络支持，一般SVN都是局域网，只能是公司内部人员使用，外界的人想参与开发是比较麻烦的，中央服务器不一定就稳定，一旦出事中央服务器所有资源都洗白白。

GIT：分布式
    不需要网络支持就能进行版本控制，只要能上网还要有开发权限都能参与开发，就算远程仓库库出事儿，计算机已经有了历史记录

GITHUB：程序员交友网站、远程仓库、帮助学习


> git的三大区域

- 工作区 （本地）

- 暂存区 （保护工作区和版本区）

- 版本区 （版本库、历史区）只有行成版本才能进行版本的控制


- 形成版本就是根据.git文件来操作的，所以说要进行版本控制，必须要有.git这个隐藏文件

- 按着tab键可以补全命令

- 设置用户信息:

git config --global user.name 'xxx'
git config --global user.eamil 'xxx'

- 创建版本仓库
    git init(想在哪进行版本控制，就在哪个文件夹下使用右键点击git bash here)


- 查看状态
    - git status

    如果查看状态的时候发现文件是红色的，就说明文件没有进行版本控制

- 工作区到暂存区
    - git add 文件名
    - git add .  (快速把所有文件都放到暂存区)


- 暂存区到版本区
    - git commit -m "取个自己能够识别的名字"


- 快速从工作区到版本区
    - git commit -a -m "取个自己能够识别的名字"

- 查看版本
    - git log
    - git reflog (查看所有的历史记录（包括历史区回滚后）)

出现nothing to commit, working directory clean就说明没有文件没被管理了（都被管理了）


- 回滚
    git reset --hard 历史ID


- touch .gitignore (创建.gitignore文件)

在文件中填写过滤的文件或文件夹

*.zip、*.rar、*.via、*.tmp过滤这些后缀名的文件

排除指定文件夹下的文件， /txt/1.txt

排除指定文件夹  \txt2

git rm -r --cached .  如果已经提交过的代码，使用.gitignore是无效的，那么请使用前面这段代码


- clear清屏

- 如果发现:号就按Q键退出

- 查看各大区域的区别
    - 工作区到暂存区  git diff
    - 工作区到版本区  git diff master
    - 暂存区到版本区  git diff --cached
    















