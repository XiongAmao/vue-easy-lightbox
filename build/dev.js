process.env.NODE_ENV = 'dev'

var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require('./config')
var devConfig = require('./webpack.dev.config')
var compiler = webpack(devConfig)
var opn = require('opn')

var server = new webpackDevServer(compiler, {
    hot: true,
    quiet: true,
    compress: true,
    inline: true,
    overlay: true,    // 
    publicPath: config.dev.outputPublicPath,
    stats: { colors: true }
})
server.listen(config.dev.port, "0.0.0.0")

var url = `http://localhost:${config.dev.port}/`

server.middleware.waitUntilValid(function() {
    console.log(`> Listening at ${url}`)
    opn(`${url}`)
})
