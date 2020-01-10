import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        val:'vue马上就结束了'
    },
    mutations:{
        changeval(state,val){
            state.val = val;
        }
    }
});;