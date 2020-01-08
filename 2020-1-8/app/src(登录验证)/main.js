import Vue from 'vue'
import App from './App.vue'
import router from './router'
import qs from 'qs';

console.log(qs)

Vue.config.productionTip = false

Vue.prototype.$qs = qs;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
