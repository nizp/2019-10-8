import React, { Component } from 'react';
import PPa from './PPa'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <h1>父级</h1>
                <PPa />
            </div>
        );
    }
}

export default App;

