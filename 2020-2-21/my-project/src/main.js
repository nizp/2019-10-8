import Vue from 'vue'
import App from './App'
import Store from './store/index';

Vue.config.productionTip = false
App.mpType = 'app'


Vue.prototype.$store = Store;
const app = new Vue(App)
app.$mount()
