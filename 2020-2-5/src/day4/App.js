import React from 'react'

/*
    React的生命周期从广义上分为三个阶段：挂载、渲染、更新、卸载

    执行一次:
        constructor   1
        componentWillMount  2
        render   3
        componentDidMount 4

    数据更新阶段
        父级数据变化
            componentWillReceiveProps(nextProps)  (1)

        数据发生变化的时候出发(不管是子级的数据还是父级的数据)
            shouldComponentUpdate(nextProps,nextState)   (2)

        DOM更新之前
            componentWillUpdate(3) (用的不多)
        
        render  (4)

        DOM更新之后
            componentDidUpdate(有用)

    只要是钩子函数中都要小心使用this.setState,小心死循环，使用的时候建议加判断。




    一次的
        component  Will Mount
        component  Did Mount

    更新
        component Will Updtae
        component Did  Updtae

        
        component Will Receive Props

        should Component Update
    
    

*/

class App extends React.Component {
    constructor(props) { //beforeCreate
        super(props);
        console.log('constructor',this.state)
        this.state = {
            val:'只要父级点了val，子级就会变',
            ary:[1,2,3]
        };
        this.len = 0;
        this.timer = null;
    }
    //可以拿到数据（一般用的很少）
    componentWillMount(){
        console.log('WillMount',this.state)
    }
    //这里可以使用ajax请求,还可以操作DOM、定时器操作
    componentDidMount(){
        // console.log(document.getElementById('oo'),'DidMount');
        this.len = document.querySelectorAll('li').length;
        console.log(document.querySelectorAll('li').length,'DidMount');

        this.timer = setInterval(()=>{console.log(123)},1000)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.pnum === this.props.pnum){
            this.setState({val:'父级点了val，子级也就跟着变了'})
        }
        console.log('父级更新了（只要父级的一个数据发生变化都会触发这个钩子）','更新之后的数据'+nextProps.pnum,'更新之前的数据',this.props.pnum)
    }
    //如果设置return false之后直接阻止render执行
    shouldComponentUpdate(nextProps,nextState){ //用于组件优化
        // console.log(nextState.val)
        if(this.state.val === nextState.val && nextState.val === '父级点了val，子级也就跟着变了'){
            return false;
        }
        return true;
    }

    componentWillUpdate(){
        console.log('DOM更新之前')
        console.log(document.querySelectorAll('li').length)
    }
    componentDidUpdate(){
        console.log('DOM更新之后')
        this.len = document.querySelectorAll('li').length;

        console.log(this.len)
    }
    componentWillUnmount(){
        console.log('子组件销毁')
        clearInterval(this.timer);
    }

    render() {
        /*
            在render里面不要使用this.setState()不然会1死循环
        */
        console.log('render');
        let list = this.state.ary.map((item,i)=><li key={i}>{item}</li>);
        
        return (
            <div id="oo">
                <p>{this.props.pnum}</p>
                <p>{this.state.val}</p>
                <button onClick={this.add}>点击更新li</button>
                <ul>{list}</ul>
            </div>
        );
    }
    add = () => {
        let {ary} = this.state;
        ary.push(8);
        this.setState({ary});
    }
}

export default App;