import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {  
//             num:10
//         };
//         this.click = this.click.bind(this);
//     }
//     render() {
//         let {num} = this.state;
//         return (
//             <div>
//                 <p>{num}</p>
//                 <button onClick={this.click}>点击添加</button>
//                 <button>点击添加2</button>
//             </div>
//         );
//     }
//     componentDidMount(){
//         let btn = document.querySelectorAll('button')[1];
//         let _this = this;
//         let {num} = this.state;
       
//         //原生click
//         btn.onclick = function(){
//             num ++;
//             _this.setState({num});
//             console.log(_this.state.num);  //同步的
//         }
//     }
//     click (){
//         // console.log(this);
//         let {num} = this.state;
//         num ++;

//         //同步
//         // setTimeout(() => {
//         //     this.setState({num});
//         //     console.log(this.state.num);
//         // });

//         this.setState({num});
//         console.log(this.state.num)

//         // console.log(this.state.num)  //是异步

//         // this.setState({num});
//         // this.setState({num:12});
//         // this.setState({num:13}); //走最后一个



        
//     }
// }






ReactDOM.render(<App />, document.getElementById('root'));
