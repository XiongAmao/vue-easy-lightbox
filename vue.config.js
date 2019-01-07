module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-easy-lightbox/' // demo
    : '/',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    extract: false // inline-css
  },
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
