import axios, { AxiosError } from '../../src/index'

// 404 错误
axios({
  url: '/error/get1',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

axios({
  url: '/error/get',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

// 网络错误
setTimeout(() => {
  axios({
    url: '/error/get',
    method: 'get'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}, 5000)

// 超时错误
axios({
  url: '/error/timeout',
  method: 'get',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err.code, err.request)
})