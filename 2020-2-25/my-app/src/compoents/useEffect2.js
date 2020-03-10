import React,{useState,useEffect} from 'react';
// console.log(React)

function UseEffect2(){
    const [num,setnum] = useState(0);
    const [num2,setnum2] = useState(10);
    useEffect(()=>{
        document.title = '数字为'+num;
        console.log('触发了么ajax');
    },[num]);
    return (
        <div>
            <button onClick={()=>{setnum(num+1)}}>{num}</button>
            <button onClick={()=>{setnum2(num2+1)}}>{num2}</button>
        </div>
    )
}

// class UseEffect2 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             num:0
//         };
//     }
//     componentDidMount(){
//         document.title = '数字为'+this.state.num;
//     }
//     componentDidUpdate(){
//         document.title = '数字为'+this.state.num;
//     }
//     render() {
//         // document.title = '数字为'+this.state.num;
//         return (
//             <div>
//                 <button onClick={()=>{this.setState({num:++this.state.num})}}>{this.state.num}</button>
//             </div>
//         );
//     }
// }



export default UseEffect2;
