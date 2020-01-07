<template>
  <div>
    <div id="nav">
      {{$route.params.un}}:欢迎你
      <router-link tag="button" to="/about/nizp/id/1">About1</router-link>
      <router-link tag="button" to="/about/ds/id/2">About2</router-link>
      <router-link tag="button" to="/public">public</router-link>
      <router-link tag="button" :to="{name:'p4',params:{n:'白晓'}}">p4</router-link>
      <router-link tag="button" :to="{name:'p5',params:{nn:'白晓'}}">p5</router-link>
      <!-- <router-link tag="button" :to="{path:`/p4/`+n}">p4</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name:'home',
  data(){
    return {
      n:'白晓'
    }
  }
}
</script>

<style scoped>

</style>