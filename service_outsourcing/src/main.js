import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/wyz-echarts/wyz-echarts.js'
import './assets/echarts-all-3.js'
import './assets/bmap.js'
import BaiduMap from 'vue-baidu-map'
// 导入字体图标
import './assets/font/iconfont.css'
// 导入全局样式
import './assets/global.css'
// axios请求
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: 'hijMK5tEKLayv9c3jF4UhaaEyCg5LFGN'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
