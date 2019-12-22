import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
import BaiduMap from 'vue-baidu-map'

import axios from 'axios'
axios.defaults.baseURL = 'http://180.76.184.216/api/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'xFYZy9RF6k9rMxUkcPgWd7T0DxAyH84I'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
