<template>
  <div id="app">
    <router-view :login_box='login_box' :mainlog='mainlog' :mainhome='mainhome' ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      mainlog: '',
      login_box: '',
      mainhome: ''
    }
  },
  mounted () {
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      this.mainlog = 'mbmainlog'
      this.login_box = 'mblogin_box'
      this.mainhome = 'mbmainhome'// 移动端
    } else {
      this.mainlog = 'pcmainlog'
      this.login_box = 'pclogin_box'
      this.mainhome = 'pcmainhome'// pc端
    }
  }
}
</script>

<style>
</style>
