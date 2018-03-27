import axios from 'axios';
import { Message } from 'element-ui';
//import Registry from './registry';
// const initData = Registry.get('initData') || initData;

// 创建axios实例
const http = axios.create({
    baseURL: initData.api, // api的baseURL
    timeout: 15000 // 请求超时时间
});

// request拦截器
http.interceptors.request.use(req => {
  return req.headers['Token'] = initData.token; // 让每个请求携带token
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});

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
       var result;
        try {
          result = JSON.parse(response);
        } catch (error) {
          result = response;
        }

        if (result.code < 0 ) {
          if (result.code == -2 || result.code == -10) {
            Message.error({
              message: result.msg
            });
            Promise.reject(result);
          }else{
            Promise.reject(result);
          }
        } else {
          if (result.code == 2) {
            Message.success({
              message: result.msg
            });
          } else if (result.code == 3) {
            Message.warning({
              message: result.msg
            });
          } else if (result.code == 4) {
            MessageBox.alert(result.msg, '提示', {
              confirmButtonText: '确定',
              type:'warning'
            });
          }
          Promise.resolve(result.data);
        }
    },
    error => {
        console.log('err ->' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);
export default http;
