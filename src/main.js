// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
// import store from './store'

import 'normalize.css/normalize.css' // reset css
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less' // global css

Vue.use(Element)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
