import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name:'home'
  },
  /*
    $route
    获取路由的信息（属性）

    this.$route.parmas

    $router
    跳转路由的方法(方法)

    动态路由:
      主体一样，但是部分内容不一样，可以使用动态路由
      写法:
        /about/:id 匹配下面几种路由(这个id是自定义的)
          /about/1
          /about/2
          ...

        /about/:uname/id/:id 

      使用:
        $route.params.id   
        切换的时候不会触发一些钩子函数，比如created，可以使用watch监听

        watch:{
          '$route'(){

          }
        }


    嵌套路由:
      在路由配置中使用children:[{path:'x'}]  匹配的是  /parent/x
      注意的是parent组件中需要写上router-view 要不然子组件渲染不出来
      如果进入parent下没有指定的children,又要默认添加一个组件，可以在path上写个''


    编程导航:
      $router.push()
      $router.replace()
      $router.go()

      可以传字符串和对象 
        '/'
        {
          path:'/'
          name:'home',
          query:{
            name:'白晓'   -> /?name=白晓
          },
          params:{
            nn:'白晓'  -> 注意的是路由上不会显示nn，但是可以通过$route.params.nn去获取
          }
        }

      重定向:
        { path: '/a', redirect: { name: 'foo' }}

      路由传参:
        可以在路由配置项中配置一个props,如果为true，那么子组件可以通过
        props去接收parmas参数
          可以看Home.vue中的 p4


        

  */
  {
    path: '/about/:id',
    // path: '/about/:uname/id/:id',  // /about/nizp/id/1
    //延迟加载
    component: () => import('../views/About.vue')
  },
  {
   
    path: '/login',  // /about/nizp/id/1
    //延迟加载
    component: () => import('../views/login.vue')
  },

  {
    path: '/public/',
    component: () => import('../views/public.vue'),
    children:[
      {
        path: 'p1',//  /public/p1  * 不要加 /不然就不匹配
        component: () => import('../views/p1.vue')
      },
      {
        path: 'p2',
        component: () => import('../views/p2.vue')
      },
      //如果进入/public下没有指定的children,默认添加一个组件，可以在path上写个''
      {
        path:'',
        component: () => import('../views/p3.vue')
      }
    ]
  },
  {
    path:'/p4',
    name:'p4',
    props:true,
    component: () => import('../views/p4.vue')
  },
  {
    path:'/p5',
    name:'p5',
    //当做一个传递数据的钩子
    props:(route)=>({
      n:route.params.nn
    }),
    component: () => import('../views/p5.vue')
  },
  {
    path:'/p6',
    // redirect:'/p4'
    redirect:to=>{
      // console.log(to.fullPath)
      return '/p4';
    }
  },
  // {
  //   path: '/p1/',
  //   component: () => import('../views/p1.vue')
  // },
  // {
  //   path: '/p2/',
  //   component: () => import('../views/p2.vue')
  // },
  {
    path:'*',
    component: () => import('../views/404.vue')
  }
]

// console.log(process.env.BASE_URL,'112')

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
