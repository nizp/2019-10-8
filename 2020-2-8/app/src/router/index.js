import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './myRouter';
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
