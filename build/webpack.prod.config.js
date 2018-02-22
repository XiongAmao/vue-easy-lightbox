var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

function resolve(relPath) {
  return path.resolve(__dirname, relPath)
}

module.exports = {
  entry: {
    index: resolve('../src/main.js')
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: 'index.js',
    library: 'vue-easy-lightbox',
    libraryTarget: 'umd'
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
            // js: 'babel-loader'
            // css: ['vue-style-loader', 'css-loader', 'postcss-loader']
          }
        }
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({

    // }),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true,
      }
    })
  ]
}
