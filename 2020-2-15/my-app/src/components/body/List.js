import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {songer,txt,index,checked} = this.props;
        let obj = {background:'rgba(225, 86, 113, 0.3)'}
        let sClass = index%2?obj:{};
        if(checked){
            sClass = {background:'rgba(225, 86, 113, 0.8)',color:'rgb(255, 255, 255)'};
        }

        // console.log(this.props)
        
        return (
            <li style={sClass}>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={this.change}
                />
                <span>{txt}</span>
                <span>{songer}</span>
            </li>
        );
    }
    change = () => {
        let {id,checkedfn} = this.props;
        checkedfn(id);
    }
}

export default connect(_=>({}),actions)(List);