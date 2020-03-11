import React from 'react';
import routerList from './index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
                {routerList}
            </>
        );
    }
}

export default App;
