<template>
    <div class="departList">
        <div class="search">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>部门管理</el-breadcrumb-item>
                <el-breadcrumb-item>部门列表</el-breadcrumb-item>
            </el-breadcrumb>
            <el-input 
                v-model="search" 
                @change="searchFn" 
                placeholder="请输入内容"
                clearable
                autofocus
            ></el-input>
        </div>
        <el-card class="box-card">
            <el-table
                stripe
                :data="tableData"
                style="width: 100%"
                :fit="true"
                border>
                <el-table-column
                    label="部门编号"
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="部门名称"
                    prop="name"
                   >
                </el-table-column>
                <el-table-column
                    label="部门描述"
                    prop="desc"
                   >
                </el-table-column>
                <el-table-column
                    v-if="power"
                    label="部门操作"
                    prop="name"
                   >
                    
                     <template slot-scope="scope">
                        <el-button-group >
                            <!-- 修改部门 -->
                            <el-tooltip :enterable="false" class="item" effect="dark" content="修改部门" placement="top">
                                <el-button 
                                    size="small" 
                                    type="primary" 
                                    icon="el-icon-edit"
                                    @click="replace(scope.row.id)"
                                ></el-button>
                            </el-tooltip>
                            <!-- 删除部门 -->
                            <el-tooltip   :enterable="false" class="item" effect="dark" content="删除一个用户" placement="top">
                            <el-button 
                                size="small" 
                                type="warning" 
                                icon="el-icon-delete"
                                @click="removeList(scope.row.id)"
                            ></el-button>
                             </el-tooltip>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>

<script>
import {departListAPI} from '../../api/api'
    export default {
      async created(){
            this.power = JSON.parse(sessionStorage.getItem('power')).power.includes('departhandle');
            const data = await departListAPI({
                pagenum:this.pagenum-1,
                count:this.count
            })

            if(data.code === 0){
                this.tableData = data.data;
            }

        },
        data(){
            return {
                search:'',
                tableData:[],
                pagenum:1,
                count:6,
                power:false
            }
        },
        methods:{
           async searchFn(){
                const data = await departListAPI({
                    pagenum:this.pagenum-1,
                    count:this.count,
                    search:this.search
                });

                if(data.code === 0){
                    this.$message.success('搜索成功');
                    this.tableData = data.data;
                }
                

            },
            replace(){

            },
            removeList(){

            }
        }
    }
</script>

<style lang="less">
.departList{
    .search{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:35px;
        .el-input {
            width:20%;
           
        }
    }    

    .box-card{
        margin-top:10px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);
    }

}
</style>