import React, { Component } from 'react';
import {connect} from './react-redux/index';
import * as actions from './react-redux/actions';
class PPa extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props)
        const {num,add} = this.props;
        return (
            <div>
               ppa
               <p>{num}</p>
               <button onClick={add}>点击添加</button>
            </div>
        );
    }
}

// console.log(connect()(PPa))
/*
    {
        r1:{

        },
        r2:{

        }
    },
    {
        ...state,
        kkk:'sdsadas'
    }
*/
function mapstate(state){
    return state;
}
/*
    connect()(PPa) -> 新的组件
*/
export default connect(mapstate,actions)(PPa);

