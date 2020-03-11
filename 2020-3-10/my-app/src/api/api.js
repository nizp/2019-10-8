import instance from './index';


//  localhost:8888/user/login

//用户登录
export const loginAPI = ({account,password}) => instance.post('/user/login',{account,password})

//修改信息
export const changeUserAPI = (obj) => instance.post('/user/update',obj);


//登录验证
export const isLoginAPI = () => instance.get('/user/login').then(d=>d.code===0);

//请求权限接口（渲染左菜单）
export const powerAPI = (name='user') => instance.get('/'+ name +'/power');

//员工列表
export const userListAPI = ({
    departmentId,
    search='',
    pagenum=1,
    count = 5
}) => {
    let url = '/user/list';
    if(departmentId !== undefined){
        url += '?departmentId='+departmentId+'&search='+search;
    }
    url += url.includes('?')?'&':'?'; 
    url += 'pagenum='+(pagenum-1)+'&count='+count;
    return instance.get(url);
};

//员工筛选列表
export const userSelectAPI = () => instance.get('/department/list');



export const userDeleteAPI = (id) => instance.get('/user/delete?userId='+id);

// list统一接口
export const allListAPI = (name) => instance.get('/'+ name +'/list');

//获取用户详细信息
export const userInfoAPI = (id) => instance.get('/user/info?userId='+id);

// //重置密码用户
export const resetPassAPI = ({userId,password}) => instance.post('/user/resetpassword',{userId,password});


//添加用户
export const userAddAPI = (obj) => instance.post('/user/add',obj);



//{pagenum,count,search=''}
//部门列表
export const departListAPI = (obj) => instance.get('/department/list',{params:obj});


//客户管理

//列表
/*
    type
    search
    lx => all ||  my
    limit = 10,
    page = 1
*/
export const customerListAPI = (obj) => {
    let opt = {
        type:'',
        search : '',
        page : 1,
        limit : 5,
        lx : ''
    };

    Object.assign(opt,obj)

    let url = '/customer/list';
    
    return instance.get(url,{params:obj});
};

