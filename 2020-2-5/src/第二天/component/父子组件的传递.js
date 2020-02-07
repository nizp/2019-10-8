import React from 'react'
class App5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num:1,
            ary:[1,2,3,4]
        };
    }
    render() {
        const {num,ary} = this.state;
        let list = ary.map((item,i)=><List key={i} txt={item}/>)
        return (
            <>
                <div>父组件{num}</div>
                <hr />
                <P5Child pnum={num}/>
                <ul>{list}</ul>
            </>
        );
    }
}


function List(props){
    return (<li>{props.txt}</li>)
}

function P5Child(props){
    return (<>子组件{props.pnum}</>)
}

// class P5Child extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         const {pnum} = this.props;
//         return (
//             <>
//                 子组件{pnum}
//             </>
//         );
//     }
// }




export default App5;