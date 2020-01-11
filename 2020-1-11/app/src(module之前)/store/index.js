import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:0
  },
  //mutations只能同步的修改数据
  mutations: {
    increment(state){
      state.num ++;
      // setTimeout(() => {
      //   state.num ++;
      // }, 2000);
    }
  },
  //异步代码
  actions: {
    asyncIncrement({commit}){
      setTimeout(() => {
        commit('increment');
      }, 2000);
    }
  },
  modules: {
    
  }
})
