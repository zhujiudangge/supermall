import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // console.log(config)
      //  1.比如config中的一些信息不符合服务器要求

      // 2.比如每次发送网络请求时,都希望在界面显示一个请求图标

      // 3.某些网络请求(如登录(token)), 必须携带一些特殊的信息

      // 响应拦截

      return config
    },
    (err) => {
      console.log(err)
    }
  )
  instance.interceptors.response.use(
    (res) => {
      // console.log(res)
      return res.data
    },
    (err) => {
      // console.log(err)
    }
  )
  return instance(config)
}
