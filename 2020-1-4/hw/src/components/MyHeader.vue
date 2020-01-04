<template>
     <header class="header" >
        <h1>todos</h1>
        <input 
            v-model="val"
            @keyup.13="enterFn"
            class="new-todo" 
            placeholder="请输入内容"
        >
         <!-- @input="changev" -->
    </header>
   
</template>

<script>
    export default {
        data(){
            return {
                val:''
            }
        },
        methods:{
            enterFn(){
               this.$emit('cv',this.val);
               this.val = '';
            }
            // changev(){
            //     this.$emit('cv',this.val);
            // }
        }
    }
</script>

<style scoped>

</style>