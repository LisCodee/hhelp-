<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-row>
            <el-button type="primary" @click="login"
              >登录</el-button
            >
          </el-row>
          <el-row>
            <el-button type="info" @click="register">注册</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginFormRules: {
        // 验证用户名合法
        email: [
          { required: true, message: '输入邮箱', trigger: 'blur' },
          { type: 'email', message: '输入正确的邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.$axios
            .post('/login/', {
              email: this.loginForm.email,
              password: this.loginForm.password
            })
            .then(response => {
              //必须使用箭头函数，不然无法通过this.$router控制路由
              console.log(response)
              if (response.data.err_code == 0) {
                window.sessionStorage.setItem('token', response.data.token)
                this.$router.push('/home')
                return this.$message.success('登陆成功')
              } else {
                return this.$message.error(response.data.err_msg)
              }
            })
            .catch(function(error) {
              return this.$message.error(error)
            })
        }
      })
    },
    register(){
        this.$router.push('/rigister')
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  height: 100%;
  background-image: url('../assets/hh登录页面.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.login_box {
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 60%;
  top: 50%;
  transform: translate(0, -50%);
}
.el-button {
  padding: 12px 115px;
  border-radius: 40px;
  margin-bottom: 12px;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .el-input {
    background-color: #ffffff;
  }
}
</style>
