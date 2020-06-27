module.exports =  function registerInterceptorRouter(router) {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello ')
  })
}