<template>
    <div>
        <div class="userlist">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>员工管理</el-breadcrumb-item>
                <el-breadcrumb-item>员工列表</el-breadcrumb-item>
            </el-breadcrumb>
           
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-button 
                            v-if="userhandler"
                            type="danger"  
                            icon="el-icon-delete"
                            @click="open"
                        ></el-button>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-select  
                            placeholder="全部"
                            v-model="val"
                            @change="changeSelect"
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
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-input 
                            v-model="search" 
                            @clear="searchFn"
                            ref="search"
                            placeholder="请输入内容"
                            clearable
                            autofocus
                        ></el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-card class="box-card">
            <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                :fit="true"
                @selection-change="handleSelectionChange"
                border>
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="性别"
                    width="50"
                >
                    <template  slot-scope="scope">
                        <div>
                           {{scope.row.sex*1?'女':'男'}}
                        </div>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="部门"
                    prop="department"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="职务"
                    prop="job"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="邮箱"
                    prop="email"
                    show-overflow-tooltip
                    >
                </el-table-column>
                <el-table-column
                    label="电话"
                    prop="phone"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="描述"
                    prop="desc"
                    show-overflow-tooltip
                    width="140">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                    v-if="userhandler"
                >
                    <template slot-scope="scope">
                        <el-button-group >
                            <!-- 修改用户信息 -->
                            <el-tooltip :enterable="false" class="item" effect="dark" content="修改用户信息" placement="top">
                                <el-button 
                                    size="small" 
                                    type="primary" 
                                    icon="el-icon-edit"
                                    @click="replace(scope.row.id)"
                                ></el-button>
                            </el-tooltip>
                            <!-- 删除一个用户 -->
                            <el-tooltip   :enterable="false" class="item" effect="dark" content="删除一个用户" placement="top">
                            <el-button 
                                size="small" 
                                type="warning" 
                                icon="el-icon-delete"
                                @click="removeList(scope.row.id)"
                            ></el-button>
                             </el-tooltip>
                            <!-- 重置密码 -->
                            <el-tooltip v-if="resetPass"  :enterable="false" class="item" effect="dark" content="重置密码" placement="top">
                                <el-button 
                                size="small" type="success" icon="el-icon-setting" @click="ruleForm2.userId = scope.row.id;dialogVisible2 = true"></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[6, 12, 15]"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="sizes , prev, pager, next"
                :total="total">
            </el-pagination>
        </el-card>

        <!-- current-page  页码切换的时候，当前页回调
        :page-sizes="[5, 10, 20]"  一页显示多少条数据
        :page-size="100" 当前选中一页有多少条
        :total="400" 总页数 -->
        <!-- <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="total">
        </el-pagination> -->

        <!-- 修改信息弹框，是独立的，不然会出现重叠问题 -->
        <el-dialog
            title="修改用户信息"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form 
                :model="ruleForm"  
                ref="ruleForm" 
                label-width="100px"
                :rules="rules"
            >
                <el-form-item label="用户名">
                    <el-input v-model="ruleForm.name" disabled></el-input>
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
                <el-form-item label="部门"  class="tl">
                    <el-select  
                        v-model="departmentVal"
                        @change="departmentSelect"
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

                <el-form-item label="职务"  class="tl">
                    <el-select  
                        placeholder="全部"
                        v-model="jobVal"
                        @change="jobSelect"
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

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button 
                    type="primary"
                    @click="confirmReplace"
                >确 定</el-button>
            </span>
        </el-dialog>


        <!-- 重置密码的弹框 -->
        <el-dialog
            title="重置密码"
            :visible.sync="dialogVisible2"
            width="50%"
            @closed="$refs.ruleForm2.resetFields()"
           >
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" >
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false;">取 消</el-button>
                <el-button type="primary" @click="resetPassword">确 定</el-button>
            </span>
        </el-dialog>



    </div>
</template>

<script>
import md5 from 'js-md5';
import {resetPassAPI,userListAPI,userSelectAPI,userDeleteAPI,allListAPI,userInfoAPI,changeUserAPI} from '../../api/api';
    export default {
        created(){
            this.getList();
            this.userSelectFn();
            let session = sessionStorage.getItem('power');
            if(session){
                this.userhandler = JSON.parse(session).power.includes('userhandle')
                this.resetPass = JSON.parse(session).power.includes('resetpassword')
            }
        },
        mounted() {
            const that = this;
            this.$refs.search.$el.children[0].onkeyup = function(ev){
                if(ev.keyCode === 13){
                    that.searchFn();
                }
            }
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

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                pageSize:6,
                total:10,//总页数
                currentPage:1, //当前页
                resetPass:false,
                //判断是否有权限进行员工修改
                userhandler:false,
                rules2:{
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                },
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
                    ]
                },
                ruleForm2:{
                    userId:0,
                    pass:'',
                    checkPass:''
                },
                ruleForm:{
                    name:'',
                    id:0,
                    sex:'男',
                    email:'',
                    phone:'',
                    desc:'',
                    departmentId:'',
                    jobId:''
                },
                departmentVal:'',
                jobVal:'',
                dialogVisible:false,
                dialogVisible2:false,
                tableData: [],
                userSelect:[],
                jobchange:[],
                val:'',
                search:'',
                selectionChange:[],
                searchId:0
            }
        },
        methods:{
            
            handleSizeChange(val){
                this.pageSize = val;
                this.getList();
                // console.log(val);
            },
            handleCurrentChange(num){
                this.currentPage = num;
                this.getList();
            },
            //重置密码
            resetPassword(){
                 this.$refs.ruleForm2.validate(async (valid) => {
                    if (valid) {
                        const {userId,checkPass} = this.ruleForm2;
                        
                        const data = await resetPassAPI({userId,password:md5(checkPass)});
                        let type = 'success';
                        let message =  '重置密码成功!';
                        switch (data.code) {
                            case 0:
                                type = 'success';
                                this.dialogVisible2 = false;
                                // this.$refs.ruleForm2.resetFields(); //重置
                                break;
                            case 2:
                            case 1:
                                type = 'error';
                                break;
                            case 2:
                                type = 'error';
                                break;
                            case 4:
                                type = 'error';
                                break;
                        }

                        this.$message({
                            type,
                            message:data.msg
                        });
                       
                    } else {
                        this.$message({
                            type: 'error',
                            message: '重置密码失败!'
                        });
                        return false;
                    }
                });
            },
            removeList(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async (e)=>{
                    const data = await userDeleteAPI(id);
                    if(data.code === 0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                  

                }).catch(()=>{
                    this.$message({
                        type: 'success',
                        message: '已取消删除!'
                    });
                })
            },
            confirmReplace(){
                this.$refs.ruleForm.validate(async (valid) => {
                    /*
                        userId=1&name=xxx&sex=0&email=xxx&phone=xxx&departmentId=1&jobId=1&desc=xxx
                    */
                    if (valid) {
                        const {id,name,sex,email,phone,desc} = this.ruleForm;
                        const obj = {
                            sex:sex==='男'?0:1,
                            name,
                            userId:id,
                            email,
                            phone,
                            desc,
                            departmentId:this.departmentVal,
                            jobId:this.jobVal
                        }

                      
                        const dd = await changeUserAPI(obj);
                        console.log(dd);
                        if(dd.code === 0){
                            this.$message.success('成功');
                            this.dialogVisible = false;
                            this.getList();
                        }
                    } else {
                        this.$message.error('修改失败');
                        return false;
                    }
                });
            },
            //渲染个人信息
           async replace(id){
                this.dialogVisible = true;
                this.jobList();
                const d = await userInfoAPI(id);
                d.data.sex = d.data.sex*1===0?'男':'女';
                this.ruleForm = d.data;
                this.departmentVal = d.data.department;
                this.jobVal = d.data.job;
                console.log(d.data);
            },
            searchFn(){
                console.log(111)
                this.getList({
                    departmentId:this.searchId,
                    search:this.search
                });
            },
            open(){
                if(this.selectionChange.length){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        let promiseAllAry = [];
                        this.selectionChange.forEach(item=>{
                           promiseAllAry.push(userDeleteAPI(item.id))
                        });

                        Promise.all(promiseAllAry).then((ary)=>{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList();

                        }).catch(()=>{
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            }); 
                        })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '请选择删除内容'
                    });    
                }
            
            },
            changeSelect(id){
                //选择查询(切换select的时候触发)
                this.searchId = id;
                this.getList({
                    departmentId:id,
                    search:this.search
                });
            },
            //选择部门
            departmentSelect(departmentId){
                this.departmentVal = departmentId;
            },
            //选择职务
            jobSelect(jobId){
                this.jobVal = jobId;
            },
           
            handleSelectionChange(val){
                //选中的时候把所有选中项都放到了val中，为一个数组
                this.selectionChange = val;
            },


            async jobList(){
                
                const data = await allListAPI('job');
                if(data.code === 0){
                    this.jobchange = data.data;
                }else{
                    this.$message.error('获取失败');
                }
            },
            async getList({departmentId,search}={}){
                // console.log(departmentId)
                // return;
                const data = await userListAPI({
                    departmentId,
                    search,
                    pagenum:this.currentPage,
                    count:this.pageSize
                });

                if(data.code === 0){
                    this.tableData = data.data;
                    this.total = data.total;
                }else{
                    this.$message.error('获取失败');
                }
            },
            async userSelectFn(){
                const data = await userSelectAPI();
                if(data.code === 0){
                    data.data.unshift({id:0,name:'全部'});
                    this.userSelect = data.data;
                }else{
                    this.$message.error('获取失败');
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                return 'warning-row';
                } else if (rowIndex === 3) {
                return 'success-row';
                }
                return '';
            }
        }
    }
</script>

<style lang="less">
.cell{
    text-align: center;
}
.tl{
    .el-form-item__content{
        text-align:left;
    }
}



.myselect {
    .el-input__suffix{
        top:4px;
    }
}

.el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
    background: #f0f9eb;
  }
.box-card{
    margin-top:20px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.1) !important;
    .el-pagination{
        margin-top:20px;
    }
}
.el-row{
    width:50%;
}
.userlist{
    height:30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-main{
    line-height:0;
}
.el-button--danger{
    height:30px;
    padding: 8px 20px
}
.el-input__inner,.el-input{
    height:32px !important;
}

</style>