import Vue from 'vue'
import Vuex from './myvuex';
// import Vuex from './vuex';


Vue.use(Vuex);

// Vue.use(Vuex);


/*
    let Vuex = {
      Store:function(){

      }
    }
    Vuex.Store
*/
export default new Vuex.Store({
  state: {
    num:0
  },
  mutations: {
    add(state,payload){
      state.num += payload;
    }
  },
  actions: {
    asyncAdd(commit,...payload){
      setTimeout(()=>{
        commit('add',...payload);
      },1000)
    }
  },
  modules: {
  }
})
