import React from 'react';
import {
    Redirect,
} from 'react-router-dom';
import lazy from './lazy.js';
import Home from '../components/Home';
const About = lazy(()=>import('../components/About'));
const AboutChild = lazy(()=>import('../components/aboutChild'));
const Login = lazy(()=>import('../components/login'));
const NoRouter = lazy(()=>import('../components/NoRouter'));

const routes = [
    {
        path:'/',
        // component:Home,
        render:(props)=>{
            let login = sessionStorage.getItem('login')?JSON.parse(sessionStorage.getItem('login')):false;
            if(!login){
                return <Redirect to="/login"/>
            }
            return <Home {...props}/> 
        }
    },
    {
        path:'/about',
        component:About
    },
    {
        path:'/about/:sid',
        component:AboutChild
    },
    {
        path:'/login',
        component:Login,
        children:[
            {
                path:'/login/a',
                component:NoRouter
            }
        ]
    }
];

export default routes;