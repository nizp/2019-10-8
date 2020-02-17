import React from 'react'
import PropTypes from 'prop-types';
//context

/*
    1.引入prop-types
    2.在层级比较高的组件中定义一个childContextTypes的静态对象（这个对象上放的是需要传递的数据类型）
        static childContextTypes = {
            num:PropTypes.number，
            add:PropTypes.func
        }
    3.定义一个放具体数据的方法，返回一个对象
        getChildContext(){
            return {
                num:0,
                add:()=>{
                    ....
                }
            }
        }
    4.下级组件取数据或者方法
        1.在下级组件中定制一个contextTypes的对象（要什么数据就把这个数据的名字和类型定义好）
            static contextTypes = {
                num:PropTypes.number,
                add:PropTypes.func
            }
        2.下级组件就可以通过
            this.context.xxx

        

*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           num:0
        };
    }
    //申明数据的类型
    static childContextTypes = {
        num:PropTypes.number,
        add:PropTypes.func
    }

    //定义具体的数据
    getChildContext(){
        return {
            // num:0,
            num:this.state.num,
            add:()=>{
                this.setState(perv=>({num:++perv.num}))
            }
        }
    }

    render() {
        return (
            <div>
                父级
                <hr />
                <PPa />
            </div>
        );
    }
}

class PPa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    // static contextTypes = {
    //     num:PropTypes.number
    // }
    render() {
        // console.log(this.context.num);
        return (
            <div>
                <div>ppa</div>
                <p></p>
                <hr />
                <ApA />
                <PaP />
            </div>
        );
    }
}


class ApA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    static contextTypes = {
        num:PropTypes.number,
        add:PropTypes.func
    }
    render() {
        // console.log(this.context.add);
        return (
            <div>
                <div>apa</div>
                <button onClick={()=>{this.context.add()}}>点击增加</button>
                <p>{this.context.num}</p>
            </div>
        );
    }
}

class PaP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    //要什么数据就把数据的名字和类型定义好
    static contextTypes = {
        num:PropTypes.number
    }
    render() {
        //定义好之后就用this.context.xxx去获取
        console.log(this.context.num);
        return (
            <div>
                <div>pap</div>
                <p>{this.context.num}</p>
            </div>
        );
    }
}



export default App;