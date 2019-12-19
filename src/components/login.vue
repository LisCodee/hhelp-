<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <el-form
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info">注册</el-button>
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
        username: '',
        password: ''
      },
      loginFormRules: {
        // 验证用户名合法
        username: [
          { required: true, message: '输入用户名', trigger: 'blur' }
          // { min:3, max:10, message: "长度在3-10个字符", trigger: "blur"}
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
      console.log(this)
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.$axios
            .post('/login/', {
              email: this.loginForm.username,
              password: this.loginForm.password
            })
            .then(response => {
              if (response.data.err_code == 0) {
                window.sessionStorage.setItem('token', response.data.token)
                this.$router.push('/home')
              } else {
                return this.$message.error(response.data.err_msg)
              }
            })
            .catch(function(error) {
              console.log(error)
            })
          // const {data: res} = await this.$http.post("login", this.loginForm);
          // console.log(res)
          // return this.$message.success("登录成功！")
          // // 将登录成功后的token，保存到客户端的sessionStorage中，token只在当前打开网页期间生效
          // window.sessionStorage.setItem("token", res.data.token);
          // this.$router.push("/home");
        }
        // this.$router.push("/home");
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
