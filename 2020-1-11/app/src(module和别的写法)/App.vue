<template>
  <div>
    <input type="text" :value="12312" ref="txt" @blur="blur">
    <button @click="add">非异步 {{ num }}</button>
    <button @click="add2">异步{{num}}</button>
    <button @click="add3">触发aaa</button>
    <router-link to="/about">去关于</router-link>
    {{vv}}
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
export default {
  computed:{
      ...mapState({
        num:state=>state.a.num,
        val:state=>state.b.val
      }),
      //如果有命名空间，那么mapGetters要用对象
      ...mapGetters({
        vv:'b/revsers'
      }),
      // revsers(){
      //   return this.val.split('').reverse().join('')
      // }
  },
  methods:{
    ...mapMutations(['a/INCREMENT','b/changeval','b/aaa']),
    ...mapActions(['a/asyncIncrement']),
    
    add(){
      // this.increment();
      // this['a/increment']();
      // console.log(this['a/INCREMENT'])
      this['a/INCREMENT']();
    },
    add2(){
      // this.asyncIncrement();
      this['a/asyncIncrement']();
    },
    add3(){
      this['b/aaa']();
      // this.num ++
    },
    blur(){
      // this.changeval(this.$refs.txt.value);
      this['b/changeval'](this.$refs.txt.value);
    }
  }
}
</script>

<style scoped>

</style>