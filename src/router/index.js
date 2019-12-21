import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import userlogin from '../components/userlogin.vue'
import register from '../components/register.vue'
import avoidEat from '../components/avoidEat.vue'
import expert from '../components/expert.vue'
import food from '../components/food.vue'
import formula from '../components/formula.vue'
import memo from '../components/memo.vue'
import modify from '../components/modify.vue'
import pharmacy from '../components/pharmacy.vue'
import sendby from '../components/sendby.vue'
import sport from '../components/sport.vue'
import toexpert from '../components/toexpert.vue'

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
    children: [
      { path: '/welcome', component: welcome },
      // 忌吃清单
      { path: '/avoidEat', component: avoidEat },
      // 对话专家
      { path: '/expert', component: expert },
      // 
      { path: '/food', component: food },
      // 食疗养生
      { path: '/formula', component: formula },
      // 智能备忘录
      { path: '/memo', component: memo },
      // 修改资料
      { path: '/modify', component: modify },
      // 附近药房
      { path: '/pharmacy', component: pharmacy },
      // 线上挂号
      { path: '/sendby', component: sendby },
      // 运动保健
      { path: '/sport', component: sport },
      // 成为专家
      { path: '/toexpert', component: toexpert },

    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/userlogin' || to.path === '/register') return next()
  // 获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/userlogin')
  return next()
})

export default router
