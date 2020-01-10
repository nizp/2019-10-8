<template>
  <div class="about">
    <h1>This is an A page</h1>
    <button @click="add">{{num}}</button>
    <button @click="add2">和b关联</button>
  </div>
</template>
<script>
import {bus} from '../bus/index';
console.log(bus)

/*
  把a的值传给b（点击B的add2的时候改变a）

  把b的值传给a（点击A的add2的时候改变b）
*/
export default {
  created(){
    //**订阅**changeb事件，事件中把num改成传入的值
    //点击B的时候改变A
    bus.$on('changeb',(val)=>{
      this.num = val;
    })
  },
  data(){
    return {
      num:0
    }
  },
  methods:{
    add(){
      this.num++
    },
    add2(){
        bus.$emit('changea',this.num);
    }
  }
}
</script>
