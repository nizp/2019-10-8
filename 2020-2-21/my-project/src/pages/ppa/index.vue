<template>
    <div>
        <div>12356789</div>
        <div>567</div>
        <button @click="add">{{num}}</button>
    </div>
</template>

<script>

export default {
    created(){
        console.log(this.$store);
    },
    computed:{
        num(){
            return this.$store.state.num;
        }
    },
    methods:{
        add(){
            // console.log(123)
            this.$store.commit('add');
        }
    }
}
</script>

<style scoped>

</style>