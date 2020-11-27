import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router/index'
import { getToken } from '@/utils/auth'
import qs from "qs";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (config.method.toLocaleLowerCase() == 'get') {
        config.params = {
          ...config.params,
          token: getToken()
        }
      } else if (config.method.toLocaleLowerCase() == 'post') {
        config.data = qs.stringify({
          ...config.data,
          token: getToken()
        })
      }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === -2) {
        // to re-login
        MessageBox.confirm('登陆已失效，重新授权？', {
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken')
          const fullPath = router.currentRoute.fullPath
          router.push(`/login?redirect=${fullPath}`);
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
