import axios from 'axios'
import { Message } from 'element-ui'
import { getToken,removeToken } from '@/utils/auth'

// 创建axios实例
const http = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})

// request拦截器
http.interceptors.request.use(req => {
  if(getToken){
    req.headers['Lite-Token'] = getToken() // 让每个请求携带token
  }
    return req
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
http.interceptors.response.use(
    response => {
       /**
        *  200: '服务器成功返回请求的数据',
        *  201: '新建或修改数据成功。',
        *  202: '一个请求已经进入后台排队（异步任务）',
        *  204: '删除数据成功。',
        *  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
        *  401: '用户没有权限（令牌、用户名、密码错误）。',
        *  403: '用户得到授权，但是访问是被禁止的。',
        *  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
        *  406: '请求的格式不可得。',
        *  410: '请求的资源被永久删除，且不会再得到的。',
        *  422: '当创建一个对象时，发生一个验证错误。',
        *  500: '服务器发生错误，请检查服务器',
        *  502: '网关错误',
        *  503: '服务不可用，服务器暂时过载或维护',
        *  504: '网关超时'
        *
        */
        const res = response.data

        if (res.code != 200) {
            Message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
            })
            // 返回 401 清除token信息并跳转到登录页面
            if(res.code != 401){
              removeToken()
              router.replace({
                  path: '/login'
              })
            }
            return Promise.reject(res)
        } else {
            return Promise.resolve(res)
        }
    },
    error => {
        console.log('err ->' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default http
