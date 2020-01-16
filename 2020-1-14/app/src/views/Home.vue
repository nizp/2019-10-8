<template>
    <el-container class="home">
      <el-header>
        <h1 class="logo">CRM-客户管理系统</h1>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="组织结构" name="first"></el-tab-pane>
          <el-tab-pane v-if="customerPower" label="客户管理" name="second"></el-tab-pane>
        </el-tabs>
        <div class="padd"></div>
        <div>
          <span class="name">欢迎：{{uname}}</span> 
          <el-button 
            type="primary" 
            size="mini"
            @click="logout"
          >安全退出</el-button>  
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
            <el-button class="btn_primary"  type="primary" @click="isCollapse=!isCollapse">{{isCollapse?'展开':'收起'}}</el-button>
          
          <!-- </el-radio-group> -->
          <cbl :pcollap="isCollapse"/>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
</template>

<script>
import cbl from './cbl';
import {mapActions} from 'vuex';
export default {

  created() {
    
    let obj = sessionStorage.getItem('power');
    if(obj){
        const {name,power} = JSON.parse(obj)
        this.uname = name;
        if(power.includes('allcustomer') || power.includes('departcustomer')){
          this.customerPower = true;
        }
    }
    this.activeName = this.$route.path.includes('/customer/list/')?'second':'first';
    this.handleClick();
    // console.log(this.activeName);

  },
  data(){
    return {
      customerPower:false,
      uname:'',
      isCollapse:false,
      activeName:'first'
    }
  },
  methods:{
    ...mapActions(['customerList','userList']),
    logout(){
      sessionStorage.setItem('token','');
      this.$router.push('/login');
    },
    handleClick(){
      // console.log('就切换路由')
      if(this.activeName === 'second'){
        this.customerList();
      }else if(this.activeName === 'first'){
        this.userList();
      }
    }
  },
  
  components:{
      cbl
  }
}
</script>

<style lang="less">

.home{
  .padd{
    width:40%;
  }
  .el-tabs{
    align-self: flex-start;
  }
  .is-top{
    color:#409EFF;
    font-size:16px;
  }
  .is-active{
    color:#fff;
  }
}
.btn_primary{
  width:100%;
}
.name{
  font-size:15px;
  color:#fff;
  margin-right:10px;
}
  .el-container{
    height:90vh;
  }
  .logo{
    width:18%;
    line-height: 52px;
    letter-spacing: 3px;
  }
   .el-header, .el-footer {
    background-color: #3a3d42;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding:0;
  }

  .el-header{
    display: flex;
    justify-content: space-between;
  }
  .el-header button{
   height:38px;
   margin:10px 10px 0 0;
  }
  
  .el-aside {
    background: rgb(80, 84, 94);
    color: #333;
    /* text-align: center; */
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


  /* header */
  .bg-purple{
    background:none !important;
  }
  .logo{
    color:#fff;
  }
  .el-col-6 h1{
    float: right;
    /* margin-top:10px; */
  }
  .el-col-8{
    float: left;
  }
  .el-row {
    /* display:flex;
    justify-content: space-between; */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
