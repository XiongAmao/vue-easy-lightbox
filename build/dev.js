process.env.NODE_ENV = 'dev'

var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require('./config')
var devConfig = require('./webpack.dev.config')
var compiler = webpack(devConfig)
var opn = require('opn')
var portfinder = require('portfinder')

var server = new webpackDevServer(compiler, {
  hot: true,
  quiet: true, // necessary for FriendlyErrorsPlugin
  compress: true,
  inline: true,
  overlay: true,
  publicPath: config.dev.outputPublicPath,
  stats: { colors: true }
})

portfinder.basePort = config.dev.port

portfinder.getPort(function(err, port) {
  if (err) throw err

  server.listen(config.dev.port, '0.0.0.0')
  var url = `http://localhost:${config.dev.port}/`

  server.middleware.waitUntilValid(function() {
    console.log(`> Listening at ${url}`)
    opn(`${url}`)
  })
})
