import axios from '../../src/index'

axios({
  url: '/simple/get',
  method: 'GET',
  params: {
    a: 1,
    b: 2
  }
})