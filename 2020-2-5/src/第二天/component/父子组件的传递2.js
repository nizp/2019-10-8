import React from 'react'
class App6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num:0
        };
    }
    render() {
        const {num} = this.state;
        return (
            <>
                <div>父组件{num}</div>
                <button onClick={(ev)=>{this.add(0,ev)}}>{num}</button>
                <hr />
                <A6Child 
                    pnum={num} 
                    padd={this.add}
                />
            </>
        );
    }
    add = (...arg) => {
        //事件函数中的第一个参数，如果不是默认的ev,但是又要使用ev，那么触发事件的时候需要手动传一下
        console.log(arg);
        if(typeof arg === 'number'){
            this.setState({num:arg});
            return;
        }
        
        this.setState({num:++ this.state.num});
    }
}



class A6Child extends React.Component {
    constructor(props) {
        //constructor只会执行一次
        super(props);
        this.state = {
            num:this.props.pnum
        };
        console.log(1,this.props.pnum)
    }
    render() {
        console.log('render');//computed
        const {pnum} = this.props;
        const {num} = this.state;
        return (
            <>
                <div>子组件</div>
                <button onClick={this.cadd}>{pnum}</button>
                <hr />
                <button onClick={this.add}>{num}</button>
                <hr />
                <button onClick={this.merge}>子级的数据和父级的数据一致</button>
            </>
        );
    }
    cadd = () => {
        // console.log(this.props)
        // this.props.pnum ++;
        this.props.padd();
    }
    add = () => {
        this.setState({num:++ this.state.num});
    }

    merge = (ev) => {
        this.props.padd(ev,this.state.num);
    }
   
}






export default App6;