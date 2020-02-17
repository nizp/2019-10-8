import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';

import {createStore} from './redux';

const store = createStore(reducer);

function reducer(state={num:1},action){

    state = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case "ADD":
            state.num ++;
            break;
        default:
            return state;
    }
    return state;
}

/*
    store.getState
    store.dispatch({type:'ADD'})

*/


// document.onclick = function(){
//     //当调用dispatch，其实就是修改数据
//     store.dispatch({type:'ADD'});
//     // console.log(store.getState().num)
// }

function render(){
    ReactDOM.render(
        <App store={store}/>
        ,
        document.getElementById('root')
    );
}
render()

//订阅器
store.subscribe(()=>{
    render();
})