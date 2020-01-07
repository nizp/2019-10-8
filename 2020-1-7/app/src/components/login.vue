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
        created(){
            console.log(this.$route);
            this.path = this.$route.query.topath;
        },
        data(){
            return {
                uname:'',
                pass:'',
                path:''
            }
        },
        methods:{
            login(){
                let ary = [
                    {
                        un:'白伟',
                        pass:'123'
                    },
                    {
                        un:'尹德智',
                        pass:'123'
                    }
                ];
                const {uname,pass} = this;

                // fetch('http://localhost:80/login?uname='+ uname +'&pass='+pass).then(e=>e.json()).then(data=>{
                //     if(data.code === 0){
                //         this.$router.push('/');
                //     }else{
                //         alert('没有登录成功');
                //     }
                // })
               
                setTimeout(() => {
                    // console.log(1)
                    // console.log(ary.some(item=> item.un === uname && item.pass === pass ))
                    if(ary.some(item=> item.un === uname && item.pass === pass )){
                        localStorage.setItem('login',uname);
                        this.$router.push({
                            path:this.path
                        });
                    }else{
                        localStorage.clear();
                    }
                }, 2000);
            }
        }
    }
</script>

<style scoped>

</style>