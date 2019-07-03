module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-easy-lightbox/' // demo
    : '/',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
