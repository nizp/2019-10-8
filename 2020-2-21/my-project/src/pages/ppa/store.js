// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    num: 0
  },
  mutations: {
    increment: (state) => {
      console.log('进')
      state.num ++;
      // const obj = state
      // obj.count += 1
    }
  }
})

export default store
