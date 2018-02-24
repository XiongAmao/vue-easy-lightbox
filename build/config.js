'use strict';

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(relPath) {
  return path.resolve(__dirname, relPath)
}

module.exports = {
  dev: {
    outputPath: resolve('../dist'),
    outputPublicPath: '/',
    port: 8080
  },
  prod: {
    entry: resolve('../src/main.js'),
    outputPath: resolve('../dist'),
    outputPublicPath: '/',
    filename: 'vue-easy-lightbox.min.js',
    library: 'vue-easy-lightbox',
    libraryTarget: 'umd',
    vueLoaderOptions: {}
  },
  demo: {
    entry: resolve('../src/demo.js'),
    outputPath: resolve('../example'),
    outputPbulicPath: '/example',
    filename: 'js/[name].js',
    vueLoaderOptions: {
      loaders: {
        css: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ],
          fallback: 'vue-style-loader'
        })
      }
    }
  }
}
