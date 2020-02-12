import React from 'react';
import {
    Link
} from 'react-router-dom';
import NoRouter from './NoRouter'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props)
        return (
            <>
                <h1>HOME</h1>
                <br />
                <Link to="/about"><button>跳到关于</button></Link>
                <button onClick={this.logout}>退出</button>
                <NoRouter />
            </>
        );
    }
    logout =  () => {
        sessionStorage.clear();
        this.props.history.push('/login');
    }
}

export default Home;
