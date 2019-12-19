import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://180.76.184.216/api/'
Vue.prototype.$http = axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
