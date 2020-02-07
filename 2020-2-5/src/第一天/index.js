import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';





// class app extends React.Component {} 组件开头要小写

// class App extends Component {
//     constructor(){
//         super();
//         this.state = {}  //类似于vue中的data
//     }
//     render(){
//         return (
//             <div>你好世界</div>
//         )
//     }
// }



ReactDOM.render(<App />, document.getElementById('root'))


// ReactDOM.render(<div>你好,世界！!</div>, document.getElementById('root'))
// ReactDOM.render(React.createElement("div", null, "你好世界"), document.getElementById('root'),()=>{
//     console.log('挂载成功')
// });
