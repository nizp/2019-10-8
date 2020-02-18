import React, { Component } from 'react';
import {connect} from './react-redux/index';
class PPa extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props)
        return (
            <div>
               ppa
               <p>{this.props.num}</p>
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

export default connect(mapstate)(PPa);

