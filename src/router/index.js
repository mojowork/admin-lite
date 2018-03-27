/**
 * routes map
 * @type {Array}
 */
import Vue from 'vue';
import Router from 'vue-router';

// 懒加载，组件多时优化性能
const IM = file => () => import(`@/components/pages/${file}.vue`);

// Layout
import Main from '@/views/Main';

import Login from '@/views/Login';
import NotFound from '@/views/404';

Vue.use(Router);

/**
 * @param {Boolean}  hidden 隐藏，不在导航栏显示
 * @param {Boolean}  unique 唯一子元素，在导航栏只有一栏，没有子元素
 * @param {String}  icon 图标，在导航栏显示(阿里的iconfont)
 */
export const appRoutes = [
  {path: '/',  hidden: true,  redirect: '/table' },
  {path: '/login', name: 'login', hidden: true, component: Login },
  {path: '/', hidden: true, component: Main, children: [
    { path: '/404', name: 'NotFound', meta: {  title: 'NotFound' }, component: NotFound}
  ]}];

export const pagesRoutes = [
  {
    path: '/',
    name: 'Setting',
    meta: { title: '系统设置' },
    icon: 'iconfont icon-settingfull',
    component: Main,
    children: [
      { path: '/setting/authorize', name: 'authorize', meta: {  title: '小程序授权'} , component: IM('setting/Setting') },
      { path: '/setting', name: 'setting', meta: {  title: '小程序设置'} , component: IM('setting/Setting') },
      { path: '/setting/template', name: 'template', meta: {  title: '模板管理'} , component: IM('setting/Setting') },
      { path: '/setting/publish', name: 'publish', meta: {  title: '发布管理'} , component: IM('setting/Setting') },
      { path: '/setting/message', name: 'message', meta: {  title: '消息提醒'} , component: IM('setting/Setting') },
      { path: '/setting/rights', name: 'rights', meta: {  title: '权限管理'} , component: IM('setting/Setting') },
      ]
  },
  {
    path: '/',
    name: 'Analysis',
    meta: { title: '数据分析' },
    icon: 'iconfont icon-tubiao',
    component: Main,
    children: [
      { path: '/data/survey', name: 'survey', meta: {  title: '数据概况'} , component: IM('analysis/Analysis') },
      { path: '/data/accessAnalysis', name: 'accessAnalysis', meta: {  title: '访问分析'} , component: IM('analysis/Analysis') },
      { path: '/data/userPortrait', name: 'userPortrait', meta: {  title: '用户画像'} , component: IM('analysis/Analysis') },
    ]
  },

  { path: '*', hidden: true, redirect: '/404'}
  ];

export default new Router({
  routes: [...appRoutes, ...pagesRoutes]
})
