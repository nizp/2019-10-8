import React, { Component } from 'react';

/*
    组件一般都写单标签

    如果写双标签，那么可以通过this.props.children的方式获取子级(双标签中的内容)
    <Provider value={}>
        <App />
    </Provider>
*/
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <h1>父级</h1>
                <Paa>
                    <div>123</div>
                </Paa>
            </div>
        );
    }
}


// <div>好好学习</div>
// <p>战胜疫情</p>
class Paa extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props.children)

        // {this.props.children}

        let html = (
            <div>请插入内容</div>
        );

        if(this.props.children){
            html = this.props.children
        }

        
        return (
            <div>
                <h1>Paa</h1>
                {html}
            </div>
        );
    }
}

export default App;

