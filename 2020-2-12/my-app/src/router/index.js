import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import routes from './routes'; //引了一下配置数组

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


export default (<Switch>{routerList(routes)}</Switch>);

