<template>
  <div>
    <button
      @click="fn"
    >按钮{{num}}</button>

    <MySlot :data="ary" #list="cdata">
        <h2>{{cdata.n}}</h2>
        <p>{{cdata.age}}</p>
    </MySlot>

    <!-- <ppa :n="num"></ppa> -->
  </div>
</template>

<script>
import appa from './components/HelloWorld';
import MySlot from './components/slot';
export default {
    data(){
      return {
        num:0,
        ary:[
          {
            key:'刘艳旭',
            id:0,
            age:8
          },
          {
            key:'赵炎',
            id:1,
            age:19
          }
        ]
      }
    },
    methods: {
      fn(){
        this.num ++;
      }
    },
    components:{
      ppa:appa,
      MySlot
    }
}
</script>

<style scoped>

</style>