<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        :model="registerForm"
        :rules="registerFormRules"
        ref="registerFormRef"
        label-width="100px"
      >
        <el-form-item label="邮  箱" prop="email">
          <el-input
            type="text"
            v-model="registerForm.email"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="vercode">
          <el-input
            type="text"
            v-model="registerForm.vercode"
            prefix-icon="el-icon-s-order"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input
            type="password"
            v-model="registerForm.checkpassword"
            prefix-icon="el-icon-lock"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button type="primary" @click="submit">确认注册</el-button>
          </el-row>
          <el-row>
            <el-button type="info" @click="getvercode" :disabled="cansend"
              >发验证码</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    //   验证两次密码一致性
    var validateRepeat = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      cansend: false,
      registerForm: {
        email: '',
        password: '',
        checkpassword: '',
        vercode: ''
      },
      registerFormRules: {
        email: [
          { required: true, message: '输入邮箱', trigger: 'blur' },
          { type: 'email', message: '输入正确的邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, message: '再次输入密码', trigger: 'blur' },
          { validator: validateRepeat, trigger: 'blur' }
        ],
        vercode: [
          { required: true, message: '请输入邮箱的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.registerFormRef.validate((valide)=>{
          if(valide){
              this.$http.post('register/',{
                  email:this.registerForm.email,
                  password:this.registerForm.password,
                  vercode:this.registerForm.vercode
              }).then((response)=>{
                  if(response.status == 200){
                    if(response.data.err_code == 0){
                        this.$router.push('/login')
                        return this.$message.success("注册成功，请登录")
                    }else{
                        return this.$message.error(response.data.err_msg)
                    }
                  }else{
                      return this.$message.error(response.status + "\t" + response.statusText)
                  }
              }).catch((error)=>{
                  console.log(error)
              })
          }
      })
    },
    getvercode() {
      this.$refs.registerFormRef.validateField('email', emailValide => {
        if (emailValide == '') {
          // 邮箱格式正确，发送邮件
          console.log('发送邮件')
          this.$http
            .get('getvercode/', {
              params: {
                email: this.registerForm.email
              }
            })
            .then(response => {
              if (response.status == 200) {
                if (response.data.err_code == 0) {
                  // 禁用发邮件按钮，60s后启用
                  this.cansend = !this.cansend
                  setTimeout(msg => {
                    this.cansend = !this.cansend
                    console.log(this.cansend)
                  }, 60000)
                  return this.$message.success('验证码发送成功，请注意查收')
                } else {
                  return this.$message.error(response.data.err_msg)
                }
              } else {
                return this.$message.error(
                  response.status + '\t' + response.statusText
                )
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.register_container {
  height: 100%;
  background-image: url('../assets/hh登录页面.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.register_box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 55%;
  top: 50%;
  transform: translate(0, -50%);
}
.el-button {
  padding: 12px 115px;
  border-radius: 40px;
  margin-bottom: 12px;
}
</style>
