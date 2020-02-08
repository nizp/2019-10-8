<template>
  <div class="home">
    <button @click="click">去about页</button>
    HOME
  </div>
</template>

<script>

export default {
  name: 'Home',
  beforeCreate() {
    console.log(this.$route,'HOME');
    console.log(this.$router,'HOME');
  },
  methods:{
    click(){
    //  console.log( this.$router.push )
      this.$router.push('/about');
    }
  }
}
</script>
