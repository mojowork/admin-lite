import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// 创建axios实例
const http = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})

// request拦截器
http.interceptors.request.use(req => {
    req.headers['Token'] = getToken() // 让每个请求携带token
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
        * 以 0 为分界线
        * code <= 0 error
        * code == 2 success
        * code == 3 warning
        */
        const res = response.data
        if (res.code !== 2) {
            Message({
                message: res.data,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject('error')
        } else {
            return response.data
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
