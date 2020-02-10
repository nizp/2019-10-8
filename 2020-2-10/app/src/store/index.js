import Vue from 'vue'
import Vuex from './myvuex';
// import Vuex from './vuex';


Vue.use(Vuex);



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
      // console.log(state,payload,333)
      state.num += payload;
    }
  },
  actions: {
    asyncadd(...arg){
      // console.log(arg)
      setTimeout(()=>{
        arg[0]('add',arg[1]);//this属于window
        // console.log(commit)
      },1000)
    }
  },
  modules: {
  }
})
