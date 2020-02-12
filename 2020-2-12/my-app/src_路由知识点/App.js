import React from 'react';
import {
    Route,
    Link,
    Redirect,
    NavLink
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import AboutChild from './components/aboutChild';
import Login from './components/login';
import './components/1.css';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
                <Route path="/link" children={()=>{
                    return (<div>
                        <NavLink exact activeClassName="selected" to="/"><button>跳到首页</button></NavLink>
                        <NavLink to="/about" activeClassName="selected"><button>跳到关于</button></NavLink></div>
                    )
                }}/>
                {/*<Route path="/" exact component={Home}/>*/}
                <Route path="/" exact render={(props)=>{//props-> location,history,match
                    let login = sessionStorage.getItem('login')?JSON.parse(sessionStorage.getItem('login')):false;
                    // console.log(login)
                    if(!login){
                        return <Redirect to="/login"/>//<Login />
                    }
                    return <Home {...props}/> 
                }}/>
                <Route path="/about" exact component={About}/>
                <Route path="/about/:sid" component={AboutChild}/>
                <Route path="/login" component={Login}/>
                
            </>
        );
    }
}

export default App;
