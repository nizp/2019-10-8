import React from 'react'
import List from './list'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val:'',
            list:[1,2,3]
        };
    }
    render() {
        let {list,val} = this.state;
        return (
            <div>
                <input 
                    type="text" 
                    value={val}
                    onChange={this.change}
                    onKeyUp={this.keyup}
                />
                <Main plist={list}/>
            </div>
        );
    }
    //改的是val这个数据
    change = (ev) => {
        this.setState({val:ev.target.value})
    }
    keyup = (ev) => {
        if(ev.keyCode === 13){
            const {list,val}  = this.state;
            let newList = [...list]
            newList.push(val);
            this.setState({list:newList,val:''});
        }
    }
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           onoff:false
        };
    }
    //只要是父级的数据发生变化，就会触发这个钩子
    componentWillReceiveProps(props){
        console.log('componentWillReceiveProps');
        // if(props.list.length > 4){
        //     this.setState({onoff:true})
        // }
    }

    //不管是自己的state发生了变化，还是父级的数据发生变化，都会进当前这个钩子
    shouldComponentUpdate(nextProps,nextState){
        /*
            如果要使用这个生命周期，在修改数据状态的时候，需要修改数据引用
        */
        // nextProps就是已经更新之后的父级数据
        // console.log(this.props.plist,'没有更新的') ;//当前的父级数据(没有更新之前的)
        // console.log(nextProps.plist === this.props.plist);

        console.log('旧的'+this.props.plist,'新的'+nextProps.plist);
        console.log(this.props.plist.length,nextProps.plist.length)

        if(nextProps.plist === this.props.plist){
            return false;
        }
        return true;
        
    }


    render() {
        console.log('render')
        const {plist} = this.props;
        const {onoff} = this.state;
        return (
            <div>
                <h4 style={{display:onoff?'block':'none'}}>你的数据超过了4条</h4>
                <ul>
                    {
                        plist.map((item,i)=><List key={i} txt={item}/>)
                    }
                </ul>
            </div>
        );
    }
}





export default App;