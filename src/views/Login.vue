<template>
    <div class="login">
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
}
</style>
