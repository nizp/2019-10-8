import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';

import App from './App';


const store = createStore(reducer,applyMiddleware(thunk));

function reducer(state={num:0},action){
    state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'INCREMENT':
            state.num ++;
        break;
        default :
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