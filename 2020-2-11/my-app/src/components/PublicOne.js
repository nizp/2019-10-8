import React from 'react'
import {Link} from 'react-router-dom';
class PublicOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
                <Link to={{
                    pathname:'/public/',
                    state:{
                        id:1
                    }
                }}>
                    <button>公共页1去公共页</button>
                </Link>
                <div>PublicOne</div>
            </>
        );
    }
}

export default PublicOne;