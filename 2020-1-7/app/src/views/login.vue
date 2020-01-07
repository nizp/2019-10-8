<template>
    <div>
        <p>请登录</p>
        用户名:<input v-model="uname" type="text"/>
        密码:<input v-model="pass" type="password"/>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                uname:'',
                pass:''
            }
        },
        methods:{
            login(){
                const {uname,pass} = this;
                setTimeout(() => {
                    if(uname === '白晓' && pass=== '123'){
                        //跳转
                        // this.$router.push('/');
                        // this.$router.push({
                        //     path:'/',   //  ?name=白晓
                        //     query:{
                        //         name:'白晓'
                        //     }
                        // });


                        this.$router.push({
                            name:'home',
                            params:{
                                un:'白晓'
                            }
                        });

                        //替换
                        // this.$router.replace({
                        //     path:'/',   //  ?name=白晓
                        //     // name:'home',
                        //     // params:{
                        //     //     name:'白晓'   // /name/白晓
                        //     // }
                        //     // query:{
                        //     //     name:'白晓'
                        //     // }
                        // });
                    }
                }, 2000);
                
            }
        }
    }
</script>

<style scoped>

</style>