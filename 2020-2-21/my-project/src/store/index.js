import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        num:0
    },
    mutations:{
        add(state){
            console.log(123)
            state.num ++;
        }
    }
});