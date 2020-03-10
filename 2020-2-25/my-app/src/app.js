import React from 'react';
import Hooks1 from './compoents/hooks1';
import UseEffect from './compoents/useEffect2'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Hooks1 />
                <UseEffect />
            </div>
        );
    }
}

export default App;