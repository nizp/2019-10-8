<template>
  <div>
    哈哈，我来拉!!
    <input type="text"  v-model="val" class="txt"/>
    <button type="primary" @click="up">确定发送</button>
    <ul>
      <li v-for="(item,key) in ary" :key="key">{{item}}</li>
    </ul>
    <Card :text="num"/>
    <a href="../counter/main">去计算页</a>
    <a href="../logs/main">去订单页</a>
    <a href="../ppa/main">去ppa页</a>
    <!-- <navigator url="../counter/main" >试验</navigator> -->
  </div>
</template>

<script>
import Card from '../../components/card'
  export default {
      data(){
        return {
          val:'1234',
          ary:[1,2,3],
          num:0
        }
      },
      methods:{
        up(){
          this.ary.unshift(this.val);
          this.val = '';
        }
      },
      components:{
        Card
      }
  }
</script>

<style scoped>
.txt{
  border:1px solid #000;
}
</style>