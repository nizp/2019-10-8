<template>
  <div class="home">
    <button @click="add2">{{num}}</button>
    <button @click="add3">异步修改数据{{$store.state.num}}</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import Vuex,{mapState} from '../store/myvuex';


let that = null;
export default {
  name: 'Home',
  beforeCreate(){
    that = this;
  },
  methods:{
    // ...mapMutations.call(that,[]),
    add2(){
      this.$store.commit('add',1);
    },
    add3(){
      this.$store.dispatch('asyncAdd',1);
    }
  },
  data(){
    return {
      ...mapState.call(this,['num']),
      num2:5,
      that:null
    }
  },

  mounted(){
    console.log(this.$store.state.num);
  }

}
</script>
