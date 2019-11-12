<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="1">
        <el-form
          ref="form_login"
          class="form_login"
          :rules="rules_login"
          :model="form_login"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form_login.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form_login.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Login('form_login')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form_login: {
        username: '',
        password: ''
      },
      rules_login: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    console.log(`${this.$url}/login`)
  },
  methods: {
    Login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ajax({
            method: 'get',
            url: `${this.$url}/login`,
            params: {
              username: this.form_login.username,
              password: this.form_login.password
            }
          })
            .then(response => {
              console.log(response)
              console.log(typeof response.request.response)
              let res = JSON.parse(response.request.response)
              if (res.state === 0) {
                this.$message.warning('您还没注册哦！')
              } else if (res.state === 1) {
                this.$message.success('登录成功咯！')
                window.localStorage.setItem(
                  'username',
                  this.form_login.username
                )
                window.localStorage.setItem('Headimg', res.data)
                window.localStorage.setItem('QQ', res.QQ)
                window.localStorage.setItem('TEL', res.TEL)
                this.$router.push({ path: 'publish' })
              } else if (res.state === 2) {
                this.$message.error('密码不对哦！')
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    }
  }
}
</script>
<style>
.form_login {
  margin-top: 20px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 8px 0;
  text-align: left;
}
</style>
