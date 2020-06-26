const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const route = require('./routes')

const app = express();
const complier = webpack(webpackConfig);

app.use(webpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(complier))

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const router = express.Router();

route.registerBaseRoute(router);
route.registerErrorRoute(router);
route.registerExtendRoute(router);

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log('ok!')
})