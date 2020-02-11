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

        render  (3)



    

*/

class App extends React.Component {
    constructor(props) { //beforeCreate
        super(props);
        console.log('constructor',this.state)
        this.state = {
            val:'只要父级点了val，子级就会变'
        };
    }
    //可以拿到数据（一般用的很少）
    componentWillMount(){
        console.log('WillMount',this.state)
    }
    //这里可以使用ajax请求,还可以操作DOM、定时器操作
    componentDidMount(){
        console.log(document.getElementById('oo'),'DidMount');
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
        console.log('更新之前')
    }
    componentDidUpdate(){
        console.log('DOMM更新之后')
    }

    render() {
        console.log('render');
        return (
            <div id="oo">
                <p>{this.props.pnum}</p>
                <p>{this.state.val}</p>
            </div>
        );
    }
}

export default App;