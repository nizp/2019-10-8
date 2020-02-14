import React from 'react'
import {actionCreators} from './store/index';
import ChildComponent from './components/ChildComponent';
import {connect} from 'react-redux';//connect()()
// const {add,remove,add2,remove2} = actionCreators;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        // console.log(this.props)
        // const {r1:{num}} = this.props;
        const {num,remove,add} = this.props;
        return (
            <>
                <button onClick={remove}>-</button>
                <span>{num}</span>
                <button onClick={add}>+</button>
                <hr />
                <ChildComponent />
            </>
        );
    }
}

// export default App;

//mapStateToProps返回的对象会在this.props中显示
const mapStateToProps = (state)=>{
    //必须返回一个对象
    console.log(state)
    // return state;
    return {num:state.r1.num}
}

//优化dispatch的方法
// const mapDispatchToProps = () => {
//     // return actionCreators;
//     return {
//         add,remove
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(App);
export default connect(mapStateToProps,()=>actionCreators)(App);