<template>
  <div class="about2">
    <h1>about2 </h1>
    <p>{{$store.state.a.num}}</p>
    <p>{{$store.state.b.val}}</p>
    <!-- <p>{{revsers}}</p> -->
    <button @click="del">-</button>
    {{num2}}
    <button @click="add">+</button>
   
  </div>
</template>
<script>
import {mapGetters,mapMutations,mapState} from 'vuex';
export default {
  // created(){
  //   console.log(this.$store);
  // },
  methods:{
      ...mapMutations(['a/CHANGE_NUM2']),
      del(){
        this['a/CHANGE_NUM2']('DECRMENT')
      },
      add(){
        this['a/CHANGE_NUM2']('INCRMENT')
      }
  },
  computed:{
    ...mapState({
      num2:state=>state.a.num2
    })
    // ...mapGetters(['revsers'])
      // revsers(){
      //   return this.$store.state.b.val.split('').reverse().join('')
      // }
  }
}
</script>
