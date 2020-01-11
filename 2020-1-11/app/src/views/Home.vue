<template>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple">
            <h1 class="logo">CRM-客户管理系统</h1>  
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-button type="primary">安全退出</el-button>  
          </div></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
</template>

<script>

export default {
  
}
</script>
<style>
  .el-container{
    height:90vh;
  }
   .el-header, .el-footer {
    background-color: #3a3d42;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding:0;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
