<template>
  <div class="home">
      <!-- 输入框:<input type="text" :value="$store.state.store2.val"/> -->
      输入框:
      <input 
        type="text" 
        :value="v"
        ref="txt"
      />  
       <!-- v-model="$store.state.store2.val" -->
      store中的: {{$store.state.store2.val}}
      <button @click="changeVal">确定修改</button>
      <hr>
       <!-- {{num}}{{val}} -->
      <!-- <button>点击增加{{$store.state.store1.num}}</button> -->
      <!-- <button>点击增加{{num}}</button> -->

     <!-- {{cv()}} -->

  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  data(){
    return {
      vv:'123'
    }
  },
  name: 'home',

  methods:{
    // ...mapMutations({
    //   cv(data){
    //       console.log(data)
    //   }
    // }),
    changeVal(){
      // console.log(this.$store._modules.root._children.store2)
    }
  },

  computed:{
     ...mapState({
      num(data){
        return data.store1.num;
        // console.log(data)
      },
      v:({store2:{val}})=>val
    }),
    vv2(){
      return this.vv + '0';
    },
  }
}
</script>
