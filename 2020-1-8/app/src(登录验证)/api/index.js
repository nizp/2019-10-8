import axios from 'axios';

const instance = axios.create();

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(config => {
    console.log('请求拦截');
    //在发起请求的时候，把token带到服务器的头信息中
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = token;
    }
    return config;
},error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(config => {
    // console.log('响应拦截',config);
    //每次请求验证的时候都种上了最新的token值
    if(config.data.token){
        localStorage.setItem('token',config.data.token);
    }
   
    return config.data;
},error => {
    return Promise.reject(error);
});


export {instance}


