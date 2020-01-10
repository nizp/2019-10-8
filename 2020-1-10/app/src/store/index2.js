export default {
    namespaced: true,
    state:{
        val:'vue马上就结束了'
    },
    mutations:{
        changeval:(state,val)=>{
            console.log('进来没')
            state.val = val;
        }
    }
}