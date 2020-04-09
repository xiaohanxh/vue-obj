<template>
<div :class="login_box" >
<div class="login_box2">
<div class="login" v-bind="userdata" >
<h1>Login</h1>
<i class="iconfont icon-icon-test20"></i>
<input v-model="userdata.username" placeholder="Username" @keyup.enter="logina"><br>
 <i class="iconfont icon-icon-test14"></i>
<input v-model="userdata.password" type="password" placeholder="Password"  @keyup.enter="logina">
 <div class="bts">
<button @click="logina" @keyup.enter="logina">Login</button>
 <!-- <button>重置</button> -->
</div>
</div>
<div class="login_register">
 <router-link to="/mainlog/register">register</router-link>
 <router-link to="/mainlog/login" >Forgot password?</router-link>
</div></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userdata: {
        // 这是登陆表单的数据对象
        username: '',
        password: ''
      }
    }
  },
  props: ['login_box'],
  methods: {
    keyinup (el) {
      // 忽略某些值
    },

    logina () {
      if (this.userdata.username === '' || this.userdata.password === '') {
        alert('账号或密码不能为空')
        console.log(this.pc)
      } else {
        this.$http.post('login', this.userdata).then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success('登陆成功')
            window.sessionStorage.setItem('token', res.data.data.token)
            this.$router.push('/mainhome')
          } else {
            this.$message.error('登陆失败！')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
i{
    color: rgb(255, 255, 255);
    font-size: 25px;
  }
button{
    width: 50%;
    height: 47px;
    font-size: 25px;
    border-radius: 7px;
    position: absolute;
    outline: none;
    box-shadow: 0px 0px 0px 0px;
    font-weight: 750;
    color:rgb(255, 255, 255) ;
    background-image: linear-gradient(to right, #0a350f1e 0%, #183942 100%);
}
input{
    margin-top: 6%;
    font-size: 25px;
    border:none;
    border-radius:0;
    box-shadow: 0px 0px 0px 0px;
    border-bottom: 2px solid #fff ;
    color: azure;
    width: 60%;
    outline: none;
    padding: 0 0 0 10px;
    background-color:  transparent;
}
.bts{
    margin-top: 7%;
    display: flex;
    justify-content : center;
}
.login_box2{
    text-align: center;
    font-family:"新宋体";
    color:rgb(255, 255, 255);
}
.login_register{
  margin-top: 10%;
}
a{
  color: #fff;
  text-decoration:none;
  margin-left: 5%;
  margin-right: 3% ;
}
.pclogin_box{
    width: 30%;
    height: 35%;
    background-color: #00000050;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.mblogin_box > .login_box2{
 color: rgb(24, 22, 24);
}
.mblogin_box>.login_box2>.login_register{
  padding-top: 29%;
}
.mblogin_box>.login_box2>.login_register>a{
  color: #000;
  margin-left: 20%;
  margin-right: 5%;
  font-size: 18px;
  font-weight: 700;
}
.mblogin_box>.login_box2>.login>input{
  margin-top: 20%;
}
.mblogin_box>.login_box2>.login>.bts>button{
  margin-top: 20%;
  color: rgb(238, 119, 119);
  background-color: transparent;
}
</style>
