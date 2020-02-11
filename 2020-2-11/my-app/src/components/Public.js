import React from 'react'
import {Link} from 'react-router-dom';
class Public extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        if(this.props.location.state){
            console.log(this.props.location.state.id)
        }
       
        return (
            <>
                <Link to={{
                    pathname:'/',
                    search:'?to=public'
                }}>
                    <button>公共页去首页</button>
                </Link>
                
                <div>
                    <p>Public</p>
                    <hr />
                        <Link to="/public/1">
                            <button>去第一个页面</button>
                        </Link>
                        <Link to="/public/2">
                            <button>去第二个页面</button>
                        </Link>
                        <Link to="/public/3">
                        <button>去第三个页面</button>
                    </Link>
                </div>
            </>
        );
    }
}

export default Public;