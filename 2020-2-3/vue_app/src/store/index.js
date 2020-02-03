import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        num:0
    },
    mutations:{
        add(state,data){

            state.num ++;
            // setTimeout(()=>{
            //     state.num ++;
            // },1000)
        }
    },
    actions:{
        async actionsAdd(context){
            const data =await axios.get('/add?a=1&b=2').then(d=>d.data)
            context.commit('add',data);
            
            // setTimeout(()=>{
            //     context.commit('add');
            // },1000)
        }
    }
})



