module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-easy-lightbox/'
    : '/',
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
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
