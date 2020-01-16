import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import store1 from './index';

export default new Vuex.Store({
    ...store1,
    // modules: {
    //     cbl,
    // }
})