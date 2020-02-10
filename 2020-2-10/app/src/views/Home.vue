<template>
  <div class="home">
    <button @click="add2">{{$store.state.num}}</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import {mapState,mapMutations} from '../store/myvuex';
// import {mapState} from '../store/vuex';


export default {
  name: 'Home',
  methods:{
    // ...mapMutations(),
    add2(){
      // this.$store.commit('add',1);
      this.$store.dispatch('asyncadd',2);
      //this.add(1);
    }
  },
  data(){
    return {
      ...mapState.call(this,['num']),
      num2:5
    }
  },
  beforeCreate(){
    console.log(this.$store)
  },
  mounted(){
    console.log(this.num);
  }

}
</script>
