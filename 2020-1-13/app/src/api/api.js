import instance from './index';


//  localhost:8888/user/login

//用户登录
export const loginAPI = ({account,password}) => instance.post('http://localhost:8888/user/login',{account,password})

//登录验证
export const isLoginAPI = () => instance.get('http://localhost:8888/user/login').then(d=>d.code===0);

//请求权限接口（渲染左菜单）
export const powerAPI = () => instance.get('http://localhost:8888/user/power');


