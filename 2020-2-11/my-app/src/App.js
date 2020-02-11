import React from 'react'
import { Route,Switch,Link} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Public from './components/Public';
import PublicOne from './components/PublicOne';
import PublicID from './components/PublicId';
import NotPage from './components/404'; 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            <Link to="/">首页</Link> |
            <Link to="/about">关于</Link> |
            <Link to="/public/">公共页</Link> |
            <Link to="/public/one">公共页1</Link>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/public/" strict exact component={Public}/>
                <Route path="/public/one" component={PublicOne}/>
                <Route path="/public/:id" component={PublicID}/>
                <Route component={NotPage} />
            </Switch>
                {/*
                 <Switch>
                    <Route path="/about" component={About}/>
                    <Route path="/" component={Home}/>
                </Switch>
                */}
            </>
        );
    }
}

export default App;