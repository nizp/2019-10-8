<template>
    <div>
        <p>LOGIN</p>
        用户名:<input type="text"  v-model="val">
        <button @click="click">点击登录</button>
        <button @click="click2">是否登录</button>
    </div>
</template>
<script>
//https://www.cnblogs.com/xuxinstyle/p/9675541.html  token知识点
import {get,post} from '../api/api';
    export default {
        data(){
            return {
                val:''
            }
        },
        methods:{
            click(){
                //测试用的
            //    get().then(data=>{
            //        console.log(data);
            //    })
                
                post(this.val).then(data=>{
                    if(data.code === 0){
                        this.$router.push('/');
                    }else{
                        alert('登录失败');
                    }
                    this.val = '';
                })
            },
            click2(){
                
            }
        }
    }
</script>

<style scoped>

</style>