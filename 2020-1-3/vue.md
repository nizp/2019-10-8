### Vue

    - jquery    52.8k
    - angular   55.8k
    - React     141k
    - vue       155k
        - MVVM框架  Model View  View Model(双向数据绑定)
        - M-model数据，V-view视图  C-控制器control

        - 难点:父子组件的传递,路由配置和使用,生命周期,vuex,**逻辑**,做项目

> https://cn.vuejs.org/

- 渐进式（弱主张，逐渐学习的，有过程的学习，vue全家桶:vue,vue-router,vuex,vue-cli）：JavaScript 框架

### 使用vue
    - 引vue
    - 在html里挂载一个根元素
        ```
            <div id="app"></div>
        ```
    - 实例化vue  -> new Vue({})

    - 配置参数
        - el:'挂载元素'（不能挂body和html）,
        - data（存数据）:在**new Vue**下值为***对象***
        - 在组件里面data为函数，函数要return {num:0}

    - 输出数据用 双花括号 {{放数据名称即可}} 小胡子

### 指令
    - 为了方便开发者开发，vue中使用了指令，这些指令包含了很多元素身上的属性和js的一些内置方法

    v-text  ----> innerText
    v-html  ----> innerHTML
    v-show  ----> display:block/none  布尔值
    v-if  看下布尔值是否为true，为true就渲染否则就不渲染
    v-else 限制:它上面必须是v-if或者v-else-if
    v-else-if 限制：前一兄弟元素必须有 v-if 或 v-else-if。
    v-on:（缩写@）事件名="事件函数|简单语法"
        一般事件函数是放在methods下
        - $event  
            如果不传参，第一个参数就是事件对象
            *** 如果传了参还想拿到事件对象，需要在模板中的事件函数内传一个
        - 修饰符  .13  .enter .stop  .prevent .once ...
        - 解绑事件可以使用
            ```
                @mousedown="onoff && down($event)"
                当onoff是真的就添加事件，假的就解除事件
            ```

    v-for="val,key in 数据"  遍历对象或者数组
        如果是数组val就是数组的成员，key就是索引
        如果是对象val键值，key键名

### filter过滤器
    Vue.filter('名字',(val)=>{
        return val.xxx
    })

    {{ val | '名字' }}


> 局部:
    - new Vue({filters:{
        名字:(val){

        }
    }})

### computed  计算属性（通过data中的数据变化进行二次操作且一上来就执行一次）
    ```
        computed:{
            //getter
            revers(){
                return xxx
            }

            revers:{
                get(){
                    return  xxx
                },
                set(){

                }
            }
        }
    ```
    - getter
    - setter

### watch 通过data中的**指定**数据变化进行二次操作
    ```
        watch:{
            //默认不会深度监听
            ary(){
                xxx
            },
            ary:{
                handler(){

                },
                deep:true   //深度监听
                immediate: true  //一上来就触发
            }
        }
    ```

### ref 为了快速定位元素或者组件
    ```
        <ppa ref="xx">

        this.$refs.xx
    ```

### 组件
    ```
        //放在new Vue上方
        Vue.component('组件名',{
            template:``,  注意的是顶层只能有一个元素
            data(){
                return {
                    ary:[]
                }
            }
        })



        {
            components:{
                组件名:对象
            }
        }

    ```
### 组件的传递
    ```
        传递:
            通过子组件的属性来传
            <div num="3"></div>（静态的） 或者
            <div :num="pnum"></div>（动态的）

        接收:
            {
                props:['num']
            }
    ```

    在父级传递数据给自己的时候，可以让自己拥有父级的数据并且不与父级数据相关联
        1.通过子组件的属性来传
            <div :num="pnum"></div>（动态的）

        2.使用props接收
            {
                props:['num']
            }

        3.把接收过来的数据变成自己的
            {
                props:['num'],
                data(){
                    return {
                        cnum:this.num
                    }
                }
            }


    ```
        子传父:
            1.父级需要定义一个改变自己数据的方法
            2.子级需要定义一个事件，去调用父级的方法
                this.$emit('自定义事件名',可以传参)
            3.在子组件的行间绑定子级的事件，值为父级的修改数据的方法
    ```

### Vue.nextTick  数据改变，DOM更新完成之后触发



    








