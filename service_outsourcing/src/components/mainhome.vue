<template>
<div :class="mainhome">
<el-dialog class="eldialog"
  title="个人面板"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">

  <div class="fdxx" >     <div class="gerenxx" >
       <span> 真 实 姓 名： {{turename}} </span><br>
       <span> 性 别：  <input type="text"> </span><br>
       <span> 身 份 证 号： {{userssID}} </span><br>
       <span> 联 系 电 话：  <input type="text"> </span><br>
       <span> 职 业：  <input type="text"> </span><br>
      </div>
      <br><img :src="touxiangsrc" alt="头像">
  <!-- 头像上传 -->
      <el-upload
        class="avatar-uploader"
        action="上传到。。。。。。"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="upimageUrl" :src="upimageUrl" class="avatar">
        <el-button type="text" v-else >上传头像</el-button>
      </el-upload>
      <h3> 昵 称 ：<input v-model="nicheng" type="text"></h3>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确定信息</el-button>
  </span>
</el-dialog>
<el-container>
<div class="el-aside" >
  <div class="topdiv" > 交通大数据分析平台</div>
  <img :src="touxiangsrc" alt="头像">
  <div class="topdivdiv" >{{nicheng}}</div>
 <el-menu background-color="#181D20">
                  <el-menu-item index="1-1"><router-link to="/mainhome/heatmap"><i class="iconfont icon-icon-test23"></i> 人口密度热力 </router-link></el-menu-item>
                  <el-menu-item index="1-2"><router-link to="/mainhome/goout"><i class="iconfont icon-icon-test22"></i> 用 户 出 行 </router-link></el-menu-item>
                  <el-menu-item index="2-1"><router-link to="/mainhome/quyu"><i class="iconfont icon-icon-test21"></i> 用 户 驻 留 </router-link></el-menu-item>
                  <el-menu-item index="2-2"><router-link to="/mainhome/heatma"><i class="iconfont icon-icon-test16"></i> 人群来源去向 </router-link></el-menu-item>
  </el-menu>
  <div class="asidefoot" @click="dialogVisible = true" >
      <div class="wrap">
    <div class="front middle">
      <h2>ID CARD</h2>
      <h3>Hover Me</h3>
    </div>
    <div class="back middle">
      <h2>萧寒</h2>
      <div class="contact-info">
        <a href="#" class="iconfont icon-icon-test33"></a>
        <a href="#" class="iconfont icon-icon-test31"></a>
        <a href="#" class="iconfont icon-dingtalk"></a>
      </div>
    </div>
  </div>
  </div>
</div>
<el-main>
    <div class="kkl" ></div>
    <el-header>
        <img src="../assets/logo.png" alt="logo">
        <span>996工作室<br> 996 studio</span>
        <el-badge :value="6" class="item">
            <el-dropdown trigger="click">
                <el-button icon="el-icon-bell" circle></el-button>
              <el-dropdown-menu slot="dropdown">
                <span>你猜<br>你猜<br>你猜<br>你猜<br>你猜<br>你猜</span>
              </el-dropdown-menu>
            </el-dropdown>
        </el-badge>
            <el-dropdown trigger="click">
                <el-button icon="el-icon-share" circle></el-button>
              <el-dropdown-menu slot="dropdown">
                <span>
                 <el-button type="primary" size="mini" icon="iconfont icon-icon-test33" circle></el-button><br>
                <el-button type="primary" size="mini" icon="iconfont icon-icon-test36" circle></el-button><br>
                <el-button type="primary" size="mini" icon="iconfont icon-dingtalk" circle></el-button><br>
                <el-button type="primary" size="mini" icon="iconfont icon-icon-test31" circle></el-button><br></span>
              </el-dropdown-menu>
            </el-dropdown>
        <el-button icon="el-icon-switch-button" circle @click="logout()"></el-button>
    </el-header>
    <div class="kkl" ></div>
    <el-main>
       <transition mode="out-in">
      <router-view :center= 'center' ></router-view>
      </transition>
    </el-main>
  <div class="divfooter" >
    <el-link type="primary" class="el-icon-link" href="http://www.xpu.edu.cn/" >西安工程大学</el-link>
    <div class="citiname" ><el-popover placement="top-start" trigger="hover" content="点击重新获取位置"><el-link slot="reference" class="el-icon-map-location" @click="locamap()" >您当前所在城市：{{citiname}}</el-link></el-popover></div>
  </div>
</el-main>
</el-container>
</div>
</template>
<script>
// 菜单
export default {
  data () {
    return {
      center: [108.95309828, 34.27779990],
      citiname: '',
      nicheng: '萧 寒',
      touxiangsrc: require('../assets/top.jpg'),
      upimageUrl: '',
      turename: '萧 寒',
      userssID: '888888888888888888',
      dialogVisible: false
    }
  },
  props: ['mainhome'],
  mounted () {
    this.$http('https://api.map.baidu.com/location/ip?ak=hijMK5tEKLayv9c3jF4UhaaEyCg5LFGN&ip=&coor=bd09ll').then(res => {
      this.center[0] = res.data.content.point.x
      this.center[1] = res.data.content.point.y
      this.citiname = res.data.content.address
      this.$message.success('欢迎您,来自' + res.data.content.address_detail.city + '的朋友')
    })
      .catch(error => {
        if (error) {
          this.$message.error('位置请求失败！点击右下角地图图标重试')
          this.$notify.error({
            title: 'Error',
            message: '位置请求失败',
            position: 'bottom-right'
          })
        }
      })
  },
  methods: {
    // 定位
    locamap () {
      this.$http('https://api.map.baidu.com/location/ip?ak=hijMK5tEKLayv9c3jF4UhaaEyCg5LFGN&ip=&coor=bd09ll').then(res => {
        this.center[0] = res.data.content.point.x
        this.center[1] = res.data.content.point.y
        this.citiname = res.data.content.address
        this.$message.success('欢迎您,来自' + res.data.content.address_detail.city + '的朋友')
      })
        .catch(error => {
          if (error) this.$message.error('位置请求失败')
        })
    },
    // ID 框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 头像上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 登出
    logout () {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到login
      this.$router.push('/mainlog/login')
    }
  }
}
</script>
<style  scoped>
.pcmainhome,.mbmainhome{
  height: 100%;
  overflow: hidden;
}
/* 信息框 */
.el-upload>.el-button{
  margin-left: 40%;
}
.fdxx{
  background-color: rgba(127, 127, 127, 0.377) ;
}
.fdxx>img{
  width: 15%;
  margin-top: 10%;
  margin-left: 2%;
  border-radius: 60px;
}
.gerenxx{
  font-size: 18px;
  background-color: rgba(127, 127, 127, 0.377) ;
  margin-left: 30%;
}
.gerenxx>span>input{
  margin-top: 4%;
  margin-bottom: 5%;
}
.el-main{
  background-color: #E6E8EA;
  overflow:hidden;
}
.el-container{
    height: 100%;
    display: flex;
}
.el-aside {
  overflow:hidden;
  width: 15%;
  height: auto;
  background-color: #181D20;
  color: rgba(255, 255, 255, 0.63);
  padding: 0;
  margin: 0;
}
.el-aside>.topdiv{
  margin-left: 15%;
  margin-top: 8%;
  font-size: 130%;
}
.topdivdiv{
  margin-top: 3%;
  text-align: center;
}
.el-aside>img{
  width: 30%;
  margin-left: 35%;
  margin-top: 8%;
  border-radius: 45px;
}
.el-header{
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 0;
  align-items: center;
  background-color: #F5F5F5;
}
.el-header>span{
  color: rgb(161, 161, 161);
  margin: 1.1% 9% 0 0;

}
.el-header>.item{
margin-left: 45%;
}
.el-button{
margin: 0;
margin-left: 1%;
}
.kkl{
  background-color: #F5F5F5;
  height: 1%;
}
.divfooter{
  background-color: rgb(207, 204, 204);
  height: 7%;
  width: 101%;
  display: flex;
  align-items: center;
}
.el-icon-link{
  font-size: 20px;
  margin-left: 47%;
  transform: translate(-50%, -0%);
}
.divfooter>.citiname{
  margin-left: 20%;
  color:darkolivegreen;
}
.el-icon-map-location{
  font-size: 15px;
}
.el-main>.el-main{
  height: 88%;
  overflow:hidden;
  background-color:rgb(228, 228, 228);
}
.el-menu{
  padding-top: 5%;
}
.el-menu-item{
  margin-top: 10%;
}
.el-menu-item>i{
  font-size: 20px;
}
.el-menu-item>a{
  text-decoration:none;
  padding-top: 10%;
  padding-left: 5%;
  padding-right: 28%;
  padding-bottom: 10%;
  color: rgb(198, 199, 201);
  font-size: 20px;
  border-radius: 5px;
}
.router-link-active{
  background-color: #D95043;
}

/* 卡片 */
.asidefoot{
  color: #000;
  margin-top: 40%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.middle{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.front, .back {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('@/../../assets/mb.jpg');
  /* background: url('@/../../assets/bg.jpg') ; */
  /* background: url('@/../../assets/card.png') ; */
  background-size: cover;
  backface-visibility: hidden;
  transition: 0.8s;
}
.front {
  transform: perspective(900px) rotateY(0deg);
}
.back {
  transform: perspective(900px) rotateY(180deg);
}
.back .contact-info a {
  font-size: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  text-decoration: none;
  color: #228f8f;
  border-radius: 50%;
}
.back .contact-info a:hover {
  color: rgb(145, 48, 48);
  background-color: #1cbed3;
}
.wrap:hover .front {
  transform: perspective(900px) rotateY(-180deg);
}
.wrap:hover .back {
  transform: perspective(900px) rotateY(00deg);
}
</style>
