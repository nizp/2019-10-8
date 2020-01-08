<template>
    <div>
        <!-- {{id}} -->
        {{$route.params.id}}
        <div>我是B路由(是公共的)</div>
        <hr />
        
        <img v-if="$route.params.id==1" src="../../assets/1.jpg">
        <img v-else-if="$route.params.id==2" src="../../assets/2.jpg">
    </div>
</template>

<script>
//`${imgs[0]}`
export default {
    name:'bb',
    created(){
        console.log('组件加载');
    },
    // props:['id'],
    // 复用组件使用beforeRouteUpdate去进行监听
    beforeRouteUpdate(to,from,next){
        console.log('守卫',to.params.id);
        next();

        //如果从1跳到2，那么就直接到首页(模拟权限不够)
        // if(from.params.id === '1'){
        //     next('/');
        // }else{
        //     next();
        // }
    },

    //离开组件的时候触发
    beforeRouteLeave(to,from,next){
        const b = confirm('你舍得丢下我离开吗?');
        if(b){
            next();
        }else{
            next(false);
        }
        // console.log(b);
    },
    data(){
        return {
            // imgs:[
            //     '../../assets/1.jpg',
            //     '../../assets/2.jpg'
            // ]
        }
    },
    components:{

    }
}
</script>

<style scoped>

</style>