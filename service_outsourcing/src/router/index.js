import Vue from 'vue'
import VueRouter from 'vue-router'
import mainlog from './../components/mainlog.vue'
import login from './../components/login.vue'
import register from './../components/register.vue'
import mainhome from './../components/mainhome.vue'
import heatmap from './../components/heatmap.vue'
import goout from './../components/goout.vue'
import quyu from './../components/quxuduibi.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/mainlog/login' },
    { path: '/mainlog', component: mainlog, children: [{ path: 'login', component: login }, { path: 'register', component: register }] },
    { path: '/mainhome', component: mainhome, children: [{ path: 'heatmap', component: heatmap }, { path: 'goout', component: goout }, { path: 'quyu', component: quyu }] }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  next()
  // if (to.path === '/mainlog/login' || to.path === '/mainlog/register') {
  //   return next()
  // } else {
  //   const tokenStr = window.sessionStorage.getItem('token')
  //   if (!tokenStr) {
  //     return next('/mainlog/login')
  //   } else {
  //     // 后台验证！
  //     next()
  //   }
  // }
})
export default router
