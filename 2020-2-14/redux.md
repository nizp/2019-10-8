### Redux 
    - 是 JavaScript 状态容器，提供可预测化的状态管理。

    - reducer + Flux = Redux 

### 三大原则
- 单一数据源
    整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中

- State 是只读的
    唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象

- reducer 使用纯函数来执行修改
    function fn(a){
        return a + 1;  //number
    }
    fn(1)
    传入什么数据，输出也是什么类型的数据


- 核心概念 
    - store  主要存储数据
    - action 触发修改数据的方法（修改数据的方法名）
    - dispatch 通过dispatch派发action
    - reducer 真正改变数据的函数


```
    store  {
        num:0
    }

    dispatch('add') -> 

    function reducer(){
        add(){

            return new state
        }
    }
```


### bindActionCreators  
    - 让发起action更加好用

    - 有2个参数
    - 1.actionCreators(本身是一个对象)
        对象一个一个的小函数，函数只能返回一个对象
        "INCREMENT"  ->  add

        function add(){
            return {type:"INCREMENT"}
        }

    - 2.store.dispatch

### combineReducers
    - 合并多个reducer变成一个纯函数的方法

    ```
        const {combineReducers} = Redux
        const rootReducers = combineReducers({
            第一个reducer名字:第一个reducer,
            第二个reducer名字:第二个reducer,
            ....
        })
    ```

        



    