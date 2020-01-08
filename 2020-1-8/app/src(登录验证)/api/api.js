import {instance} from './index';
import qs from 'qs';

export const get = () => instance.get('http://localhost/test');

export const post = (uname) => instance.post('http://localhost/login',qs.stringify({uname}));

export const islogin = () => instance.post('http://localhost/islogin')
.then(d=>{
    if(d.code === 0){
        return true;
    }
    return false;
});
