import React from 'react';
import ReactDOM from 'react-dom'
import App from './view/thunk'
import {createStore,applyMiddleware}  from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
//概念就是只要发起 发起action ->  就得让数据更新

//点击的时候不发起action,
//点击时候去一个对应的中间层(拦截器)，
//在中间层中请求数据接口（进行异步的操作），等到异步结束，再发起action
/*
    applyMiddleware 专门放中间件的模块

*/

//applyMiddleware(thunk)(createStore)(renducer)

// function thunkFn({dispatch,getState}){
   
//     return next => action => {
//         console.log(123)
//         if(typeof action === 'function'){
            
//             return action(dispatch,getState)
//         }
//         return next(action)
//     }
// }


// function thunkFn({dispatch,getState}){
//     return function(next){
//         return function(acton){
           
//             console.log(next)
//         }
//     }
// }

const store = createStore(reducer,applyMiddleware(thunk));

function reducer(state={num:0},action){
    state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'INCREMENT':
            console.log('执行了')
            state.num ++;
            // setTimeout(()=>{
            //     state.num ++;
            // },2000);
        break;
        default:
            return state;
    }
    return state;
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);
