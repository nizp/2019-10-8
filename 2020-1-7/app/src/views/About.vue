<template>
  <div class="about">
    <router-link to="/">Home</router-link> |
    <router-link to="/about/nizp/id/1">About1</router-link>
    <router-link to="/about/ds/id/2">About2</router-link>
    <router-link to="/public">public</router-link>
    <h1>This is an about page</h1>
    <!-- <div v-if="$route.params.id == 1">
      这个是1111的页面
    </div>
    <div v-if="$route.params.id == 2">
      这个是2222的页面
    </div> -->
    <div>
      用户:{{$route.params.uname}}
      <h2 v-if="$route.params.id == 1">欢迎老大回来</h2>
      <p v-if="$route.params.id == 2">小弟辛苦了</p>
    </div>

    {{$route.params.id}}
  </div>
</template>

<script>

/*
  $route
    获取路由的信息（属性）

    this.$route.parmas

  $router
    跳转路由的方法(方法)
  
*/

export default {
    data(){
      return {
        num:0
      }
    },
    created(){
      this.num = 1;
      console.log('created')
      if(this.$route.params.id === '1'){
        setTimeout(()=>{
          console.log('请求接口1')
        },1000)
      }else if(this.$route.params.id === '2'){
        setTimeout(()=>{
          console.log('请求接口2')
        },1000)
      }

      // console.log(1111)
    },
    watch:{
      '$route'(to, from){
        if(to.params.id === '1'){
          setTimeout(()=>{
            console.log('请求接口1')
          },1000)
        }else if(to.params.id === '2'){
          setTimeout(()=>{
            console.log('请求接口2')
          },1000)
        }
        // console.log(to,'to');
        // console.log(from,'from')
      }
    }
}
</script>


