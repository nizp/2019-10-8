<template>
    <div>
        <h1>Vuex_2</h1>
        {{reverse}}
        <button @click="add">非异步{{num}}</button>
        <button @click="add2">异步{{num}}</button>
    </div>
</template>

<script>
    import { mapState,mapActions,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                val:'haha'
            }
        },
        methods:{
            ...mapActions(['asyncincrement']),
            ...mapMutations(['increment']),
            add2(){
                // this.$store.commit('asyncincrement');
                this.asyncincrement();
                // this.$store.dispatch('asyncincrement');
            },
            add(){
                this.increment();
                // this.$store.commit('increment');
                // setTimeout(() => {
                //     this.$store.commit('increment');
                // }, 2000);
            }
        },
        computed:{
            ...mapState(['num']),
            reverse(){
                return this.val.split('').reverse().join('');
            }
        }
    }
</script>

<style scoped>

</style>