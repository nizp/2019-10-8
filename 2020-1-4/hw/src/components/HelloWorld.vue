<template>
  <div class="box">
      我是PPA{{n}}
  </div>
</template>

<script>
export default {
    props:['n']
}
</script>

<style scoped>
.box{
  width:100px;
  height:100px;
  background:hotpink;
}
</style>