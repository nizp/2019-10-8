import React from 'react';
import {
    Redirect,
    Route,
} from 'react-router-dom';
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
        component:Home,
    }
];


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