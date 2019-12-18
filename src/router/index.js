import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  { path: '/home', component:home }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next)=>{
  if(to.path === '/login') return next()
  // 获取token
  const tokenstr = window.sessionStorage.getItem("token")
  if(!tokenstr) return next('/login')
  return next()
})
export default router
