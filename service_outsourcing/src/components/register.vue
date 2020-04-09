<template>
<div :class="login_box" >
    <div class="register" >
        <h1>register</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
  <el-form-item prop="username">
    <el-input type="text" v-model="ruleForm.username" placeholder="请输入账号" prefix-icon="iconfont icon-icon-test20"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" prefix-icon="iconfont icon-icon-test14"></el-input>
  </el-form-item>
  <el-form-item prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码" prefix-icon="iconfont icon-icon-test14"></el-input>
  </el-form-item>
  <el-form-item prop="email">
        <el-input placeholder="请填写邮箱地址" v-model="ruleForm.email" prefix-icon="iconfont icon-icon-test19"></el-input>
    </el-form-item>
  <div class="emailre">
  <el-input placeholder="请输入验证码" v-model="ruleForm.keysure" prefix-icon="iconfont icon-icon-test3">
    <el-button slot="append" type="info" @click="timer(60)">{{btntxt}}</el-button>
  </el-input>
</div>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<div class="rlink" >
<router-link to="/mainlog/login" class="routerlinkre" >Login</router-link>
    </div></div>
    </div>
</template>
<script>
export default {
  data () {
    var validateusername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户名不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
        this.keyre = 400
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
        this.keyre = 400
      } else {
        callback()
        this.keyre = 200
      }
    }
    return {
      disabled: false,
      time: 0,
      btntxt: '获取验证码',
      keyre: 0,
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
        keysure: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: validateusername, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写电子邮箱', trigger: 'change' }
        ]
      }
    }
  },
  props: ['login_box'],
  methods: {
    timer (timea) {
      // var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      // if (!regEmail.test(this.email)) {
      //   alert('邮箱格式不正确')
      // }
      // this.time = 60
      // this.disabled = true
      // console.log(timea)
      this.time = timea
      this.disabled = true
      if (this.time > 0) {
        this.time--
        timea = this.time
        this.btntxt = this.time + 's后重新获取'
        setTimeout(() => { this.timer(timea) }, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
        // console.log('123')
      }
    },
    submitForm (ruleForm) {
      if (this.keyre === 200) {
        if (this.ruleForm.username === '' || this.ruleForm.password === '' || this.ruleForm.checkpass === '' || this.ruleForm.email === '') {
          this.$message.error('请将信息填写完整后注册')
        } else {
          this.$http.post('users', this.ruleForm).then(res => {
            if (res.data.meta.status === 201) this.$message.success('注册成功')
            else this.$message.error('注册失败')
          })
        }
      }
    },
    resetForm (ruleForm) {
      this.$refs[ruleForm].resetFields()
    }
  }
}
</script>
<style scoped>
.register{
    color: rgb(255, 255, 255);
}
.el-form-item{
    margin-left: 5%;
    margin-right: 5%;
}
.rlink{
    margin-left: 80%;
    margin-top: 0;
}
.pclogin_box{
    width: 30%;
    height: auto;
    background-color: #00000050;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    text-align: center;
}
a{
  color: #fff;
  text-decoration:none;
}
.el-button--primary{
  width: 25%;
  background-image: linear-gradient(to right, #0a350f1e 0%, #183942 100%);
  border:none;
}
.el-button--default{
  width: 25%;
  background-image: linear-gradient(to right, #193D49 0%, #388EDC 100%);
  color: rgb(0, 0, 0);
  border:none;
}
.emailre{
  width: 90%;
  margin-left: 5%;
  margin-bottom: 5%;
}
.el-input{
  color: rgb(0, 0, 0);
}
.mblogin_box>.register>.rlink>.routerlinkre{
  font-size: 20px;
  font-weight: 600;
  color: #000;
}
.mblogin_box>.register{
  color: #000;
  text-align: center;
}
</style>
