// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条
// import store from './store'
import http from '@/utils/request'

import 'normalize.css/normalize.css' // reset css
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'// Progress 进度条样式
import '@/styles/index.less' // global css

import '@/mock/index'

Vue.use(Element)

Vue.config.productionTip = false
Vue.prototype.$http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
