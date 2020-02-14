import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



import store from './store/index';


console.log(store.getState())

function render(){
    ReactDOM.render(<App {...{
        ...store.getState()
    }}/>,document.getElementById('root'))
}
render();
store.subscribe(render);




