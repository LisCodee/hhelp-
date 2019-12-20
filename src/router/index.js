import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import userlogin from '../components/userlogin.vue'
import register from '../components/register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/userlogin' },
  { path: '/userlogin', component: userlogin },
  { path: '/login', component: login },
  { path: '/register', component: register },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [{ path: '/welcome', component: welcome }]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  // 获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  return next()
})

export default router
