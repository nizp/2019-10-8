import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import {createStore} from 'redux';
import Provider from './react-redux/index'

const store = createStore(reducer);

/*
    case 'Add':
        const obj1 = Object.assign({},state)
        obj1.num ++;
        return obj1
    break;
    case 'Add2':
        const obj2 = Object.assign({},state)
        obj2.num +=2;
        return obj2
    break;
    case 'Add3':
        const obj3 = JSON.parse(JSON.stringify(state));
        obj3.num +=2;
        return obj3
    break;
    case 'Add4':
        return {...state,num:++state.num}
    break;


*/
function reducer(state={num:1},action){
    state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'ADD':
            state.num ++;
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