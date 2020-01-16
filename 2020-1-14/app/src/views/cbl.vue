<template>
    <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="pcollap"
        :collapse-transition="false"
        router
        unique-opened
        :default-openeds="['1']"
        :default-active="path"
    >
  
      <el-submenu :index="''+val.id" v-for="val in cblAry" :key="val.id">
        <template slot="title">
          <i :class="iconList[val.id]"></i>
          <span>{{ val.name }}</span>
        </template>
        <el-menu-item 
            v-for="val2 in val.children" 
            :key="val2.path"
            :index="val2.path"
        >{{ val2.name }}</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
import {mapState} from 'vuex';
export default {
    props:['pcollap'],
    computed:{
        ...mapState(['cblAry'])
    },
    data(){
        return {
            collapse:false,
            powerList:[],
            iconList:{
                '1':'el-icon-user',
                '2':'el-icon-film',
                '3':'el-icon-thumb'
            },
            path:''
        }
    },
    methods:{
      
    },
    watch:{
        $route(to,b){
            console.log(to.path)
            if(to.path === '/userhandle/list'){
                this.path = this.$route.path;
                console.log(this.path,'路由')
            }
            
            // console.log('触发路由',this.$route.path,a,b);
        }
    },
    async created(){
        
        // const data = await powerAPI();
        // if(data.code === 0){
        //     this.powerList = data.pList;
        // }else{
        //     this.$message.error('获取列表失败');
        // }
        this.path = this.$route.path;
        // console.log( this.$route,'看看')
        // console.log(await powerAPI());
    }
}
</script>

<style>
.el-menu{
    border-right:none;
}
.el-submenu div{
    /* padding; */
    font-size:20px;
}
.el-submenu div span{
   display: inline-block;
    width: 70%;
    text-align: center;
}
.el-menu-item {
    text-align: center
}

</style>