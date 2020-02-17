import React from 'react'
import {connect} from 'react-redux';
import * as actions from './actions';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props)
        const {num,add,asyncadd} = this.props;
        return (
            <div>
                <button onClick={asyncadd}>{num}</button>
            </div>
        );
    }
}

export default connect(state=>state,actions)(App);