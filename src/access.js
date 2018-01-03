import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth' // 验权


router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.name === 'login') {
    removeToken()
    next()
  } else {
      if (getToken()) {
        next()
      } else {
        next({ name: 'login' })
      }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
