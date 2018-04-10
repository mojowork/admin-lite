<template>
    <div class="login">
      <el-form v-if="showForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">AdminLite登录</h3>
          <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
          <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
          </el-form-item>
      </el-form>
      <div class="acc-info" v-if="!showForm">
      </div>
      <div class="brand" v-if="!showForm">
        <img src="../assets/zhongcao.png" alt="">
      </div>
      <div class="user-info" v-if="!showForm">
        <el-button-group style="margin-right:100px;">
          <el-button  class="btn" ><i class="iconfont icon-zhuce" style="font-size:22px;"></i></el-button>
          <el-button class="btn" @click="showForm=true">我要注册</el-button>
        </el-button-group>
        <el-button-group >
          <el-button  class="btn" ><i class="iconfont icon-suo" style="font-size:22px;"></i></el-button>
          <el-button class="btn" @click="showForm=true">我要登录</el-button>
        </el-button-group>
      </div>
    </div>
</template>

<script>
import {setToken} from '@/utils/auth'
  export default {
    data() {
      return {
        logining: false,
        showForm: false,
        ruleForm: {
          account: 'chaoshuai',
          checkPass: '123456'
        },
        rules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },
        checked: true
      };
    },
    methods: {
      showAdminInfo() {},
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            this.$http.post('/login/login',{
              username: this.ruleForm.account,
              password: this.ruleForm.checkPass
            }).then(data => {
              this.logining = false;
              let {code, msg, token, user } = data;
              if (code == 200) {
                setToken(token)
                // sessionStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/' });
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
.login{
    position: absolute;
    height: 100vh;
    left: 0; right:0;
    background-image: url(http://oxdyq538l.bkt.clouddn.com/login-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .acc-info{
      height: 200px;
      flex: 0 0 200px;
    }
    .brand{
       flex: 1;
       text-align: center;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
    }
    .user-info{
      height: 200px;
      flex: 0 0 200px;
      text-align: center;
      .btn{
        background-color: rgba(255,255,255,0);
        padding: 20px 40px;
        font-size: 22px;
        color:#f3f2f3;
      }
    }
    .login-container {
      width: 260px;
      align-self: center;
      padding: 25px 35px 5px 35px;
      background-color: rgba(255,255,255,0.9);
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #304156;
      background-clip: padding-box;
      border-radius: 5px;
      .title {
        margin: 0px auto 20px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 15px 0px;
      }
    }
}
</style>
