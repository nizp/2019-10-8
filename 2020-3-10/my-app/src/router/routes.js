import React from 'react';
import {
    Redirect,
    Route,
    withRouter
} from 'react-router-dom';
import {isLoginAPI} from '../api/api';
import lazy from './lazy.js';
import Login from '../components/login/login';


const Home = lazy(()=>import('../components/home/Home'));

// const AboutChild = lazy(()=>import('../components/aboutChild'));
// const Login = lazy(()=>import('../components/login'));
// const NoRouter = lazy(()=>import('../components/NoRouter'));




const routes = [
    {
        path:'/login',
        component:Login,
        // render:(props)=>{
        //     let login = sessionStorage.getItem('login')?JSON.parse(sessionStorage.getItem('login')):false;
        //     if(!login){
        //         return <Redirect to="/login"/>
        //     }
        //     return <Home {...props}/> 
        // }
    },
    {
        path:'/',
        render:(props)=>{
            return <Redirect to="/login" />
        }
    },
    {
        path:'/home',
        render:(props)=>{
            const PrivateRoute = withHocPrivateRoute(Home);
            return <PrivateRoute />
        }
    }
];

//高阶路由守卫
function withHocPrivateRoute(WrappedComponent){
    if(!WrappedComponent){
        throw new Error("缺少组件参数");
        return false;
    }
    //withRouter 也是一个高阶组件 传递 history
    return withRouter(
        class extends React.Component{
            constructor(props) {
                super(props);
                this.state = {
                    isAuthenticated:false
                }
            }
            componentWillMount(){
                //权限验证
                const token = sessionStorage.getItem('token');
                const {history} = this.props;
                if(!token){
                    history.replace("/login");
                }else{
                    //后端校验
                    isLoginAPI().then(d=>{
                        if(d){
                            this.setState({isAuthenticated:true});
                        }else{
                            history.replace("/login");
                        }
                    });
                }
            }
            render(){
                return this.state.isAuthenticated ?  (
                    <WrappedComponent/>
                ) : <p></p>;
            }
        }
    )
}


function routerList(routes){
    let list = [];
    //这个函数如果遇到了children可能会递归
    let renderRoutes = (routes) => {
        if(Array.isArray(routes)){
            routes.forEach((route) => {
                const {path,component,children,redirect,render} = route;
                if(render){
                    list.push(<Route {...{
                        key:path,
                        exact:true,
                        path,
                        render
                    }}/>)
                }
                //如果有重定向属性
                if(redirect){
                    list.push(<Redirect {...{
                        to:redirect,
                        key:redirect
                    }}/>)
                }
                //带component
                if(component){
                    list.push(<Route {...{
                        key:path,
                        exact:true,
                        path,
                        component
                    }}/>)
                }
                //如果有children并且不是空数组就递归
                if(children && children.length > 0){
                    renderRoutes(children);
                }
            });
        }
    }
    renderRoutes(routes);
    return list;
}

export {routerList}

export default routes;