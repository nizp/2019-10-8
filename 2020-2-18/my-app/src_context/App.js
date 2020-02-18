import React, { Component } from 'react';
import MyContext from './context';
const {Consumer} = MyContext;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    static contextType = MyContext
    render() {
        // console.log(this.context);
        return (
            <div>
                <h1>父级</h1>
                {this.context.num}
                <hr />
                <PPa />
            </div>
        );
    }
}

class PPa extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Consumer>
                   {
                       ({num})=>{
                            return <p>子组件{num}</p>
                       }
                   }
                </Consumer>
                <hr />
                <ApA />
                <PaP />
            </div>
        );
    }
}


class ApA extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static contextType = MyContext;
    render() {
        return (
            <div>
                <span>孙子组件ApA{this.context.num}</span>
              
            </div>
        );
    }
}


class PaP extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    static contextType = MyContext;
    render() {
        return (
            <div>
                <span>孙子组件PaP{this.context.num}</span>
            </div>
        );
    }
}






export default App;

