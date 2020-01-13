//如果要使用modules，那么小模块是对象
import {INCREMENT} from './creatorActions';
export default {
  namespaced: true,//命名空间
  state: {
    num:0,
    num2:0
  },
  mutations: {
    CHANGE_NUM2(state,payload){
      switch (payload) {
        case "INCRMENT":
          console.log('触发')
          state.num2 ++;
          break;
        case "DECRMENT":
          state.num2 --;
          break;
      }
    },
    [INCREMENT](state){
      state.num ++;
    },
    aaa(){
        console.log('index的aaa')
    }
  },
  //异步代码
  actions: {
    asyncIncrement({commit}){
      setTimeout(() => {
        commit('increment');
      }, 2000);
    }
  }
}
