import React from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <button onClick={this.click}>点击登录</button>
        );
    }
    click = () => {
       
        setTimeout(()=>{
            sessionStorage.setItem('login','true');
            this.props.history.push('/');
        },1000);
    }
}

export default Login;
