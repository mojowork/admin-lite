/**
 * routes map
 * @type {Array}
 */
import Vue from 'vue';
import Router from 'vue-router';

// 懒加载，组件多时优化性能
const IM = file => () => import(`@/pages/${file}.vue`);

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

export const routes = [
  {path: '/',  hidden: true,  redirect: '/dashboard' },

  {path: '/login', name: 'login', hidden: true, component: Login },

  { path: '/',
    hidden: true,
    component: Main,
    children: [
      { path: '/404', name: 'NotFound', meta: {  title: 'NotFound' }, component: NotFound}]
  },
  {
    path: '/',
    name: 'Dashboard',
    meta: { title: '博客概览' },
    icon: 'iconfont icon-tubiaozhexiantu',
    component: Main,
    unique:true,
    children: [
      { path: '/dashboard', name: 'dashboard', meta: {  title: '博客概览'} , component: IM('dashboard/Dashboard')},
    ]
  },
  {
    path: '/',
    name: 'Blog',
    meta: { title: '博客管理' },
    icon: 'iconfont icon-bianji',
    component: Main,
    children: [
      { path: '/blog', name: 'blogManage', meta: {  title: '博客列表'} , component: IM('blog/Manage')},
      { path: '/blog/create', name: 'blogCreate', meta: {  title: '博客创建'} , component: IM('blog/Create')},
    ]
  },
  {
    path: '/',
    name: 'Tags',
    meta: { title: '标签管理' },
    icon: 'iconfont icon-biaoqian2',
    component: Main,
    children: [
      { path: '/tags', name: 'tags', meta: {  title: '标签列表'} , component: IM('tags/Tags')},
    ]
  },
  {
    path: '/',
    name: 'Setting',
    meta: { title: '系统设置' },
    icon: 'iconfont icon-settingfull',
    component: Main,
    children: [
      { path: '/setting', name: 'setting', meta: {  title: '博客设置'} , component: IM('setting/Setting') },
      ]
  },
  { path: '*', hidden: true, redirect: '/404'}
  ];

export default new Router({ routes })
