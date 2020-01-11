<template>
  <div class="login_box">
    <main class="mainBox">
		<h1 class="title">CRM客户管理系统</h1>
		<p class="tip">为保护企业的数据安全，请妥善保管密码</p>
    
		<section class="loginBox">
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="user">
          <div class="form">
            <el-input 
              placeholder="请输入用户名/手机号/邮箱"
              prefix-icon="icon-yonghuming iconfont"
              v-model="form.user"
            ></el-input>
          </div>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <div class="form open">
            <el-input 
              placeholder="请输入登录密码"
              prefix-icon="iconfont icon-mima"
              v-model="form.pass"
              show-password
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item>
            <el-button style="width:100%" type="primary" @click="submit">登录</el-button>
        </el-form-item>
        <!-- <button class="submit" @click="submit">登录</button> -->
      </el-form>
		</section>
	</main>
	<footer class="footerBox">
		<span>北京珠峰世纪技术培训有限公司</span>
		<span>京ICP备09041920号</span>
		<span>京公网安备110108400531号</span>
	</footer>
  </div>
</template>

<script>
import '../assets/css/iconfont.css';
import '../assets/css/login.css'
export default {
  methods:{
    submit(){
      //valid为一个布尔值，能够知道表单的内容是否都符合验证规则
      this.$refs.form.validate((valid)=>{
        //可以登录
        if(valid){
          //  this.$message.success('你真聪明');
          this.$router.push('/home');
        }else{
          this.$message.error('错了哦，这是一条错误消息');
        }
        // console.log(valid)
      })
    }
  },
  data(){
    return {
      form:{
        user:'',
        pass:''
      },
      rules: {
        //如果要自定义高级规则使用https://github.com/yiminghe/async-validator
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          pass:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
      }
    }
  }
}
</script>
<style>
.loginBox .form i.icon-mima{
  top:30px;
  left:2px;
}
.loginBox .form i{
  left:2px;
}
/* .el-form-item{
  margin-bottom: 10px;
} */
.loginBox .open i{
  left:-30px;
}
</style>
