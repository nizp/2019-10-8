import React from 'react'
import {connect} from 'react-redux';
import {actionCreators} from '../store/index';
class ChildC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {num,add2} = this.props;
        return (
            <div>
                <span>孙子级</span>
                <hr />
                <button onClick={add2}>增加</button>
                {num}
            </div>
        );
    }
}


export default connect((state)=>({num:state.r2.num}),()=>actionCreators)(ChildC);


//下面这种写法是错误的，第二个参数要为函数，不能直接使用actionCreators
// export default connect((state)=>({num:state.r2.num}),actionCreators)(ChildC)
