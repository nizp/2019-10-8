import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import index1 from './index';
import index2 from './index2';

export default new Vuex.Store({
    modules: {
        a:index1,
        b:index2
    }
})