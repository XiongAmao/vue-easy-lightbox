var path = require('path');
module.exports = {
    dev: {
        outputPath: path.resolve(__dirname, '../static'),
        outputPublicPath: '/',
        port: 8090
    },
    prod: {
        outputPath: path.resolve(__dirname, '../dist/assets'),
        outputPublicPath: '/assets/'
    }
}
