<template>
    <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
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
    </div>
</template>

<script>
import {setToken} from '@/utils/auth'
  export default {
    data() {
      return {
        logining: false,
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

<style lang="less" scoped>
.login{
    position: absolute;
    min-height: 100%;
    left: 0;right:0;
    background-color: #304156;
    .login-container {
      width: 350px;
      margin: 150px auto;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #304156;
      background-clip: padding-box;
      border-radius: 5px;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
}
</style>
