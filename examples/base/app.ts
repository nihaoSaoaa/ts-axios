import axios from '../../src/index'

// get demo

//  参数值为数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
// 参数值为对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 参数值为日期对象
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// 参数值为特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 参数值为 null
axios({
  method: 'get',
  url: '/base/get',
  params: {
    baz: 'bar',
    foo: null,
  }
})

// url 含有 hash
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'baz'
  }
})

// url 已有参数
axios({
  method: 'get',
  url: '/base/get?baz=foo',
  params: {
    foo: 'bar'
  }
})

// post demo
// data 是普通对象
axios({
  method: 'post',
  url: '/base/post',
  data: {
    foo: 'bar',
    baz: 2
  }
})

// data 是 buffer 对象
const arr = new Int32Array([21, 31])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

// precess request headers post demo
// 未设置请求头
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

// 设置了请求头（格式）
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
})

/**
 * 浏览器本身支持直接传入 URLSearchParams | FormData 等类型对象
 * 会自动将请求添加一个合适的 Content-Type
 */
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})


// process response data demo
// 分别设置了 responseType 属性
axios({
  method: 'post',
  url: '/base/post',
  data: {
    message: 'hello I am unconfig request.responseType reponse data',
    baz: 2
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    message: 'hello I am request.responseType === \"json\" response data',
    baz: 2
  }
}).then(res => {
  console.log(res)
})
