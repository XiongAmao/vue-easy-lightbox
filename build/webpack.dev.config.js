var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

function resolve(relPath) {
  return path.resolve(__dirname, relPath)
}

module.exports = {
  entry: {
    index: resolve('../src/demo.js')
  },
  output: {
    path: resolve('../example'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('../src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // css: ['vue-style-loader', 'css-loader', 'postcss-loader']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({

    }),
    new HtmlWebpackPlugin({
      title: 'My Vue App',
      template: 'index.html', // dev & demo
      inject: 'body'  
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
}
