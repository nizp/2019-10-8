<template>
    <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="pcollap"
        :collapse-transition="false"
        router
    >
      <el-submenu :index="''+val.id" v-for="val in powerList" :key="val.id">
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

    /*
        data:{
            jobId:1,
            name:'员工管理',
            children:[
                {
                    jobId:'1-1',
                    name:'员工列表'
                },
                {
                    jobId:'1-2',
                    name:'员工新增'
                }
            ]
        }
    */

import {powerAPI} from '../api/api';

export default {
    props:['pcollap'],
    data(){
        return {
            collapse:false,
            powerList:[],
            iconList:{
                '1':'el-icon-user',
                '2':'el-icon-film',
                '3':'el-icon-thumb'
            }

        }
    },
    methods:{
      
    },
    async created(){
        const data = await powerAPI();
        if(data.code === 0){
            this.powerList = data.pList;
        }else{
            this.$message.error('获取列表失败');
        }
       
        console.log(await powerAPI());
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