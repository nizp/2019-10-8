import React from 'react';
import lazy from './lazy.js';
import {
    Route,
    Link,
    Redirect,
    NavLink
} from 'react-router-dom';

// console.log(lazy)

/*
    react中自带一个懒加载的方式
        lazy，但是目前实验的结果是lazy要和Suspense一起用

    所以说我们封装一个lazy + Suspense的一个新组件，这个组件的目的就是为了进行懒加载组件

    LazyComponent(需要传入一个需要懒加载的组件（要通过lazy去引）)


    import lazy from 'xx./lazy';

    lazy(()=>import('./components/About'))
    
*/

import '../components/1.css';

// const About = LazyComponent( lazy(()=>import('./components/About')) );
// const AboutChild = LazyComponent(lazy(()=>import('./components/aboutChild')));
// const Login = LazyComponent(lazy(()=>import('./components/login')));

import Home from '../components/Home';
const About = lazy(()=>import('../components/About'));
const AboutChild = lazy(()=>import('../components/aboutChild'));
const Login = lazy(()=>import('../components/login'));

// //懒加载的函数(高阶函数)
// function LazyComponent(Component) {
//     return class extends React.Component {
//         render(){
//             const {props} = this;
//             return (
//                 <>
//                     <Suspense fallback={<div>loading...</div>}>
//                         <Component {...props}/>
//                     </Suspense>
//                 </>
//             )
//         }
//     }
// }

/*
    const routes = [
        {
            path:'/',
            component:Home
        },
        {
            path:'/xx',
            redirect:'/myxxx'
        },
        {
            path:'/about',
            component:About,
            children:[
                {
                    path:'/about/a',
                    component:About1
                }
            ]
        }

    ]
*/


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
