import React from 'react';
import {
    withRouter
} from 'react-router-dom';
class NoRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props)
        return (
            <button >没有路由功能</button>
        );
    }
}



export default withRouter(NoRouter);
