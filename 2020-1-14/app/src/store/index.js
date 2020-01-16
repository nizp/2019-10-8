//如果要使用modules，那么小模块是对象
import {CREATE_CBL_LIST} from './creatorActions';
import {powerAPI} from './../api/api';
const state = {
  cblAry:[]
}
const mutations = {
  [CREATE_CBL_LIST](state,data){
    console.log('进来',state.cblAry)
    state.cblAry = data;
  }
}
const actions = {
  //客户侧边栏
  async customerList({commit}){
    const data = await powerAPI('customer');
    //请求成功并且有客户管理的权限才能有客户管理
    if(data.code == 0){
      commit(CREATE_CBL_LIST,data.pList);
    }
  },
  //员工侧边栏
  async userList({commit}){
    const data = await powerAPI();
    //请求成功并且有客户管理的权限才能有客户管理
    if(data.code === 0){
      commit(CREATE_CBL_LIST,data.pList);
    }
  }

}


export default {
  state,
  mutations,
  actions
}


