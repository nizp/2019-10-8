import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import MyContext from './context'

const {Provider} = MyContext;


ReactDOM.render(
    <Provider value={{num:0}}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);