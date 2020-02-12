import React, { Component } from 'react'
import List from './List'
//
class MyMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    // componentWillReceiveProps(){
    //     console.log('更新了')
    // }
    shouldComponentUpdate(nextProps,nextState){
        // console.log(nextProps.pary,this.props.pary)
        if(nextProps.pary.length === this.props.pary.length){
            return false;
        }
        return true;   
    }
    render() {
        console.log('更新了','render')
        const {pary,pchecked,premove,replacetxt} = this.props;
        let list = null;
        if(pary.length){
            list = pary.map((item)=>( <List {...{
                key:item.id,
                txt:item.txt,
                checked:item.checked,
                id:item.id,
                pchecked,
                premove,
                replacetxt
            }}/>))
        }
        return (
            <section className="main">
            <input className="toggle-all" type="checkbox" />
            <ul className="todo-list">
                {list}
            </ul>
        </section>
        );
    }
}

export default MyMain;