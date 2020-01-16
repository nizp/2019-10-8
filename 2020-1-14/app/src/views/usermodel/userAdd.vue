<template>
    <div class="useradd">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增员工</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card" >
            <el-form 
                :model="ruleForm"  
                ref="ruleForm" 
                label-width="100px"
                :rules="rules">
                    <el-form-item label="用户名">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" class="tl">
                        <el-radio-group v-model="ruleForm.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="departmentId"  class="tl">
                        <el-select  
                            placeholder="请选择部门"
                            v-model="ruleForm.departmentId"
                           
                            class="myselect"
                        >
                            <el-option
                                v-for="item in userSelect"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="职务" prop="jobId" class="tl">
                        <el-select  
                            placeholder="请选择职务"
                            v-model="ruleForm.jobId"
                            class="myselect"
                            
                        >
                            <el-option
                                v-for="item in jobchange"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button 
                            type="primary"
                            @click="confirmReplace"
                        >确 定</el-button>
                    </el-form-item >
            </el-form>
        </el-card>

    </div>
</template>

<script>
import {userSelectAPI,allListAPI,userAddAPI} from '../../api/api';
    export default {
        created(){
            this.userSelectFn();
            this.jobList();
        },
        data(){
            //自定义的规则
            let regEmail = (rule, value, callback) => {
                if(/^[a-zA-Z]\w{5,12}@[a-z]{2,5}\.com$/.test(value)){
                    callback();
                }else{
                    callback(new Error('请正确输入邮箱'));
                }
            }
            return {
                dialogVisible:false,
                ruleForm:{
                    name:'',
                    id:0,
                    sex:'男',
                    email:'cxc32131c@qq.com',
                    phone:'13888888888',
                    desc:'',
                    departmentId:'',
                    jobId:''
                },
                //存部门
                userSelect:[],
                //存职务
                jobchange:[],
                selectionChange:[],
                // departmentVal:'',
                // jobVal:'',
                rules:{
                    email:[
                        {
                            min:5,
                            max:35,
                            message: '最小5个，最多15个字符',
                            trigger: 'blur',

                        },
                        {
                            validator:regEmail,
                            trigger: 'blur'
                        }
                    ],
                    phone:[
                        {
                            min:11,
                            max:11,
                            message: '请正确输入电话号码',
                            trigger: 'blur',
                        }
                    ],
                    jobId:[
                        {
                            required:true,
                            message: '请选择职务',
                        }
                    ],
                    departmentId:[
                         {
                            required:true,
                            message: '请选择部门',
                        }
                    ]
                },
            }
        },
        methods:{
            //选择部门
            // departmentSelect(departmentId){
            //     this.departmentVal = departmentId;
            // },
            //选择职务
            // jobSelect(jobId){
            //     this.jobVal = jobId;
            // },
            async userSelectFn(){
                const data = await userSelectAPI();
                if(data.code === 0){
                    this.userSelect = data.data;
                    // this.departmentVal = data.data[0].departmentId;
                }else{
                    this.$message.error('获取失败');
                }
            },
            async jobList(){
                const data = await allListAPI('job');
                if(data.code === 0){
                    //获取一下当前操作的权限，如果是6(后勤部主管)或者是1（总管），就把管理员和后勤部主管的选项过滤掉
                    const power = sessionStorage.getItem('power');
                    if(power){
                        let powerId = JSON.parse(power).jobId*1;
                        if(powerId === 6 || powerId === 1){
                            this.jobchange = data.data;
                        }else{
                           
                            this.jobchange = data.data.filter(item=>{
                                return item.id != 1 && item.id != 6;
                            });

                           
                        }
                    }
                    // this.jobVal = this.jobchange[0].jobId;
                }else{
                    this.$message.error('获取失败');
                }
            },
            confirmReplace(){
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        const {id,name,sex,email,phone,desc,departmentId,jobId} = this.ruleForm;
                        
                        this.ruleForm.sex = this.ruleForm.sex ==='男'?0:1;
                       
                        const data = await userAddAPI(this.ruleForm);
                        if(data.code === 0){
                            this.$message.success('成功');

                            this.$confirm('是否要返回到列表页?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then((e)=>{
                                this.$router.push('/userhandle/list');
                            })


                        }


                       console.log(data);

                        // name=xxx&sex=0&email=xxx&phone=xxx&departmentId=1&jobId=1&desc=xxx

                      
                        
                        
                    } else {
                        this.$message.error('修改失败');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
.useradd{
    .el-form{
        width:50%;
    }
    .tl{
        .el-form-item__content{
            text-align:left;
        }
    }
    .el-textarea{
        textarea{
            min-height:130px !important;
        }
        
    }
}

</style>