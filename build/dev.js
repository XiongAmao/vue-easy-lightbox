'use strict';

process.env.NODE_ENV = 'dev'

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./config')
const devConfig = require('./webpack.dev.config')
const opn = require('opn')
const portfinder = require('portfinder')


const options = {
  clientLogLevel: 'warning',
  hot: true,
  quiet: true, // necessary for FriendlyErrorsPlugin
  compress: true,
  inline: true,
  overlay: true,
  host: '0.0.0.0',  // necessary for Node.js API
  publicPath: config.dev.outputPublicPath,
  stats: { colors: true }
}

webpackDevServer.addDevServerEntrypoints(devConfig, options)
// https://webpack.js.org/guides/hot-module-replacement/#via-the-node-js-api

const compiler = webpack(devConfig)
const server = new webpackDevServer(compiler, options)

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
