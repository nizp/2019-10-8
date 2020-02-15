import React from 'react';
import {connect}  from 'react-redux';
import * as actions from './actions';
class Thunk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <button onClick={this.add}>{this.props.num}</button>
            </div>
        );
    }
    add = () => {
        //不建议用
        // setTimeout(()=>{
        //     this.props.dispatch({type:'INCREMENT'});
        // },2000);
        // this.props.dispatch({type:'INCREMENT'});

        // addnum();
        // console.log(this.props.addnum())
        this.props.addnum()
    }
}

export default connect(state=>state,()=>({...actions}))(Thunk);
