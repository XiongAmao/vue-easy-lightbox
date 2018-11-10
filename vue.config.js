const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    lib: {
      entry: 'src/index.js'
    }
  },
  css: {
    extract: false
  },
  // outputDir: path.resolve('./build'),
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
