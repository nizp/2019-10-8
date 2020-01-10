<template>
    <div>
        <h1>Vuex_3</h1>
        <button @click="add">{{toDou}}</button>
        <!-- <button @click="add">{{$store.getters.toDou}}</button> -->
    </div>
</template>
<script>
import {mapState,mapMutations,mapGetters} from 'vuex';
export default {
    computed:{
        ...mapState(['num']),
        ...mapGetters(['toDou'])
        // toDou(){
        //     return this.num<10?'0'+this.num:''+this.num
        // }
    },
    methods:{
        ...mapMutations(['increment']),
        add(){
            this.increment();
        }
    }
}
</script>


