/**
 * routes map
 * @type {Array}
 */
import Vue from 'vue'
import Router from 'vue-router'

const IM = file => () => import(`@/components/pages/${file}.vue`)

// Layout
import Main from '@/views/Main'

import Login from '@/views/Login'
import NotFound from '@/views/404'

Vue.use(Router)

/**
 * @param {Boolean}  hidden 隐藏，不在导航栏显示
 * @param {Boolean}  unique 唯一子元素，在导航栏只有一栏，没有子元素
 * @param {String}  icon 图标，在导航栏显示(阿里的iconfont)
 */
export const appRoutes = [
  {path: '/',  hidden: true,  redirect: '/access' },
  {path: '/login', hidden: true, component: Login },
  {path: '/404', hidden: true, component: NotFound}]

export const pagesRoutes = [{
    path: '/',
    name: 'Access',
    title: '权限管理',
    icon: 'iconfont icon-quanxian',
    component: Main,
    children: [
      { path: '/access', name: 'access', title: '权限划分', component: IM('form/Form') }]
  },

  {
    path: '/',
    name: 'Setting',
    title: '系统设置',
    icon: 'iconfont icon-settingfull',
    component: Main,
    children: [
      { path: '/setting', name: 'setting', title: '样式设置', component: IM('table/Table') }]
  },

  { path: '*', hidden: true, redirect: '/404'}]

export default new Router({
  routes: [...appRoutes, ...pagesRoutes]
})
