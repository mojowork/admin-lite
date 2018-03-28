// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
import router from './router';
import Element from 'element-ui';
import NProgress from 'nprogress'; // Progress 进度条
import store from '@/store/';
import { http } from '@/utils/';

import 'normalize.css/normalize.css'; // reset css
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';// Progress 进度条样式
import '@/styles/index.scss'; // global css

Vue.use(Element);
Vue.use(() => {

});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

Vue.config.productionTip = false;
Vue.prototype.$api = http; // 使用this.$api调用axios,简化操作

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
