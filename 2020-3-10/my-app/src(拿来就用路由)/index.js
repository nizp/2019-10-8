import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/App';
import {
    BrowserRouter as Router,
    // HashRouter as Router,
} from 'react-router-dom';


/*
    Route
        render 导航守卫

        render={(props)=>{
            //可以加入判断条件
            return <组件 />
        }}

        children 不管是否匹配路径都执行return后的组件

        children={(props)=>{
            return <组件 />
        }}

    Redirect  重定向
        <Redirect to="/"/>
        <Redirect to={{
            pathname:'/xx',
            search:'?page=1'
        }}/>

    withRouter 当组件本身没有路由功能,又想让他有路由功能，就使用withRouter
        import {
            withRouter
        } from 'react-router-dom';

    包组件
        export default withRouter(NoRouter);

    包完组件之后，就可以通过this.props去访问路由的属性和方法了

*/



ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);