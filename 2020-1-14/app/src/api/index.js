import axios from 'axios';

//instance可以被多次设置拦截,那么有可能会导致，（覆盖或者合并），所以要重新通过class去封装一个
const instance = axios.create({
    baseURL:'http://localhost:8888'
});//001

//请求拦截
//当请求的时候把用户登录信息发送给后端，让后端进行验证
//如果是token就在请求头上把token带给后端
//如果是session那么要看是否为同域，如果是同域就直接发cookie即可
//如果不是同域，需要在获取到返回数据之后，存储一下这个令牌码，然后通过参数传过去

import nprogress from 'nprogress';
import 'nprogress/nprogress.css'

console.log(nprogress)

instance.interceptors.request.use(config => {
    nprogress.start();
    const token = sessionStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = sessionStorage.getItem('token');
    }
   
    return config;
},error => {
    return Promise.reject(error);
});

// instance.interceptors



//响应拦截
//获取token或者别的令牌信息，然后存储到本地
instance.interceptors.response.use(config => {
    nprogress.done();
    // console.log(config)
    if(config.data.power){ //权限信息，要把权限信息写入本地
        //把上一次的权限信息清除
        sessionStorage.removeItem('power');
        //添加权限信息
        sessionStorage.setItem('power',JSON.stringify(config.data.power));
    }
    if(config.data.token){
        sessionStorage.setItem('token',config.data.token);
    }
    return config.data;
},error => {
    return Promise.reject(error);
});

export default instance;

