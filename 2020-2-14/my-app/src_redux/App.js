import React from 'react'
import {actionCreators} from './store/index';
const {add,remove,add2,remove2} = actionCreators;
// console.log(actionCreators)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {r1:{num},r2:{num:num2}} = this.props;
        return (
            <>
                <button onClick={remove}>-</button>
                <span>{num}</span>
                <button onClick={add}>+</button>

                <hr />

                <button onClick={remove2}>-</button>
                <span>{num2}</span>
                <button onClick={add2}>+</button>

            </>
        );
    }
}

export default App;