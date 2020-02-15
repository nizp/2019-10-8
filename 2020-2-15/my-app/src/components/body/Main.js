import React from 'react'
import List from './List';
import {connect} from 'react-redux';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {ary,collect,select,add} = this.props;

        let selectAry = [];
        switch(select){
            case 'all':
                selectAry = ary;
            break;
            case 'collect':
                selectAry = collect;
            break;
            case 'add':
                selectAry = add;
            break;
            default:
                selectAry = ary;
        }
        
        let list = selectAry.map((item,index)=>{
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