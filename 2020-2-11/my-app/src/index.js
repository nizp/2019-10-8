import React from 'react'
import ReactDOM from 'react-dom';

/*
    BrowserRouter :
        history API 必须放在根下且只有一个

    Route:
        配置项（放到Router的下面）

        <Route path="/">
            <App />
        </Route>


        <Route path="/" component={App}>

        [
            {path:'/'},
            {path:'/one'}
        ]

        因为本来就有一个特性
            path="/"
            path="/one"

            当访问/one 既会出现/也会出现/one

        如果你想/one不匹配/,那么可以使用exact

            <Route path="/" exact />
            <Route path="/one" />


        exact
        /one	/one/two	true	no
        /one	/one/two	false	yes


       
        当设置/one/ 访问/one能匹配，/one/也能匹配

        需要是当访问/one匹配不到 /one/

        这个时候就加上 strict

            <Route path="/one/" strict />
            <Route path="/one/two" />

        但是如果给path="/one/"加上了strict，那么当访问 /one/two，也会把/one/也匹配到
        那么如果想让/one/two不显示/one/，那么还可以加上exact


        strict
        /one/  /one/   true  yes
        /one/  /one/1  true  yes
        /one/  /one    true  no   


        路由中的props等同于$router + $route



    路由中的props
        只要切换路由，在当下组件中可以通过this.props去拿到跳转路由的细节信息
        history ： 跳转路由的方法（push,replace,go...）
        location ： 需要传递的信息(hash,search,pathname,state)



    to：
        <Link to="/">
         <Link to={{
             pathname:'/',
             search:'?to=about',
             hash:'#a=3',
             state:{
                id:00
             }
         }}>

    Switch:
        从上往下只匹配一个组件，匹配到下面的路由就不匹配了



    
*/

// import { 
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link} from 'react-router-dom';

import { BrowserRouter as Router} from 'react-router-dom';
    
import App from './App';

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <Router>
        <App />
    </Router>
    ,document.getElementById('root')
);

// ReactDOM.render(
//     <Router>
//         <Switch>
//             <Route path="/about" component={About} />
//             <Route path="/" component={App} />
//             {/*
//                 <Route path="/about">
//                     <About />
//                 </Route>
//                 <Route path="/">
//                     <App />
//                 </Route>
//             */}
//         </Switch>
//     </Router>
//     ,document.getElementById('root'));