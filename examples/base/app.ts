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