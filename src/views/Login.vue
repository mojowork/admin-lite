<template>
    <div class="login">
      <el-form ref="form" :model="loginForm">
        <div class="login__acc">
          <el-button class="login__btn" size="small"><i class="iconfont icon-zhanghao" style="font-size:22px;"></i></el-button>
          <el-input class="login__input" v-model="loginForm.account"></el-input>
        </div>
        <div class="login__passwd">
          <el-button class="login__btn" size="small"><i class="iconfont icon-zhanghaomima" style="font-size:22px;"></i></el-button>
          <el-input class="login__input" type="password" v-model="loginForm.password" @keyup.native.enter="handleSubmit"></el-input>
        </div>
    </el-form>
    </div>
</template>

<script>
import {setToken} from '@/utils/auth'
  export default {
    data() {
      return {
        loginForm: {
          account: '',
          password: ''
        }
      };
    },
    methods: {
      handleSubmit() {
          this.$http('/login/login',{
            ...this.ruleForm
          }).then(res => {
          })
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
    align-items: center;
        .login__acc{
          display: flex;
          margin: 10px;
          .login__btn{
            background-color: rgba(255,255,255,0);
            font-size: 22px;
            color:#f3f2f3;
            margin-right: 10px;
          }
          .login__input{
             background-color: rgba(255,255,255,0);
          }
        }
        .login__passwd{
          @extend .login__acc;
        }
}
</style>

<style lang="scss">
.login .el-input__inner{
   background: rgba(255,255,255,0);
   color: #fff;
}
</style>

