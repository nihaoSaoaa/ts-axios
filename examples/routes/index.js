const registerBaseRoute = require('./base')
const registerErrorRoute = require('./error')
const registerExtendRoute = require('./extend')
const registerInterceptorRoute = require('./interceptor')
const registerConfigRouter = require('./config')

module.exports = {
  registerBaseRoute,
  registerErrorRoute,
  registerExtendRoute,
  registerInterceptorRoute,
  registerConfigRouter,
}