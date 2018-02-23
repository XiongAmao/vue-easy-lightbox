'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./config')

function resolve(relPath) {
  return path.resolve(__dirname, relPath)
}

const buildWebpackConfig = {
  context: resolve('../'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  entry: {
    index:
      process.env.NODE_ENV === 'production'
        ? config.prod.entry
        : config.demo.entry
  },
  output: {
    path:
      process.env.NODE_ENV === 'production'
        ? config.prod.outputPath
        : config.demo.outputPath,
    publicPath: '/',
    filename:
      process.env.NODE_ENV === 'production'
        ? config.prod.filename
        : config.demo.filename
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
        options:
          process.env.NODE_ENV === 'production'
            ? config.prod.vueLoaderOptions
            : config.demo.vueLoaderOptions
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true
      }
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  buildWebpackConfig.output.library = config.prod.library
  buildWebpackConfig.output.libraryTarget = config.prod.libraryTarget
} else if (process.env.NODE_ENV === 'demo') {
  buildWebpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: '../example/index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    })
  )
}

module.exports = buildWebpackConfig
