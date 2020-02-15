import React from 'react'
import List from './List';
import {connect} from 'react-redux';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {ary} = this.props;
        // console.log(ary)
        let list = ary.map((item,index)=>{
            return ( <List {...{
                id:item.id,
                key:item.id,
                txt:item.txt,
                songer:item.songer,
                checked:item.checked,
                index
            }}/>)
        })

        return (
            <ul id="list">
                {list}
            </ul>
        );
    }
}

export default connect(state=>state)(Main);