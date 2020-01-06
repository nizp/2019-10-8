import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  {
    template:`<div></div>`
  }
*/

new Vue({
  // render: function(h){
  //   return h(App);//App,根组件
  // }
  render:h => h(App)
}).$mount('#app');//#app是根节点
