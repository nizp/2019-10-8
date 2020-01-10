# vuex

Vuex 是一个专为 Vue.js 提供的可预测的状态管理模式。

```
state，驱动应用的数据源；(data(){return {num:0}})

view，以声明方式将 state 映射到视图；({{num}})

actions，响应在 view 上的用户输入导致的状态变化。(v-model)

```

> 基本操作
 - 下载vuex  yarn add vuex
 - 引包
    - import Vuex from 'vuex';
    - Vue.use(Vuex);
 - 使用
    - const store = new Vuex.Store({})
        - store 内容
        ```
            const store = new Vuex.Store({
                //初始化数据
                state:{
                    num:0
                },
                //修改数据的指令
                mutations:{
                    add(state){
                        state.num ++
                    }
                }
            })
        ```
    - new Vue({store:store})

    - componet中通过 $store.state.xx使用
        - vuex中也提供了一个MapState
            - import {MapState} from 'vuex';
            ```
                1.第一种写法
                computed:MapState({
                    num:state=>state.num
                })
                2.第二种写法
                computed:MapState(['num'])
                3.第三种写法
                computed:{
                    ...MapState(['num']),
                    revers(){
                        return this.val.split('').reverse().join('');
                    },

                }

            ```

    - 触发mutations  this.$store.commit('mutations的名字')


### mutations
    - ** 在vuex中的数据，只能被mutations修改
    - 定义
        ```
            mutations:{
                add(state){
                    state.num ++
                }
            }
        ```
    - 触发mutations  this.$store.commit('mutations的名字')
    - 触发还有别的方式
        ```
            import {MapMutations} from 'vuex';
            methods:{
                ...MapMutations(['increment']),
                add(){

                }
            }

            this.increment() === this.$store.commit('increment')
        ```


### actions(当发生异步请求的时候使用)
- mutations只能单纯的修改数据（不能进行异步请求，不然状态无法预测）
- actions的使用
    ``` 
        actions:{
            asyncIncrement(context){
                setTimeout(()=>{
                    context.commit('mutations中的方法')
                },2000)
            }
        }

        component中如何使用

        this.$store.dispatch('asyncIncrement')
    ```
    - 触发还有别的方式
        ```
            import {MapActions} from 'vuex';
            methods:{
                ...MapActions(['asyncIncrement']),
                add(){
                    
                }
            }

            this.asyncIncrement() === this.$store.dispatch('asyncIncrement')
        ```

### getter(为了修改数据之后的二次操作)
    如果数据的二次操作多个组件需要复用，可以使用getters

    ```
        {
            getters:{
                toDou(state){
                    return state.xx的二次操作
                }
            }
        }

        import {mapGetters} from 'vuex';

        computed:{
            ...mapGetters(['toDou'])
        }

    ```
### module 当数据比较多的时候，可以把store分割为多个小的模块，最后通过modules去合并


 