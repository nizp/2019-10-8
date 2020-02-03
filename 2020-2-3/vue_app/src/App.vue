<template>
    <div>
       <button @click="fn">{{$store.state.num}}</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    methods:{
        fn(){
            // this.$store.commit('add');
            // this.add();
            // console.log(this.add)
            this.$store.dispatch('actionsAdd')
        }
    }
}
</script>

<style lang="less">
body{
    background:skyblue;
}
</style>