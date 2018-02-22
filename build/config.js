var path = require('path');

function resolve(relPath) {
  return path.resolve(__dirname, relPath)
}

module.exports = {
    dev: {
        outputPath: resolve('../dist'),
        outputPublicPath: '/',
        port: 8099
    },
    prod: {
        outputPath: resolve('../dist'),
        outputPublicPath: '/'
    }
}
