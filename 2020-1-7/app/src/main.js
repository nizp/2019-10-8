import Vue from 'vue'
import App from './App.vue'
import router from './router'

/*
  js XML
*/

Vue.config.productionTip = false

new Vue({
  router,
  //jsx语法
  render: h => h(App)
}).$mount('#app')
