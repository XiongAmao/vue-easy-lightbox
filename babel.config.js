// const useBuiltIns = process.env['BABEL_USEBUILTINS'] === 'usage' ? 'usage' : false

const config = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'usage'
    }]
  ]
}

module.exports = config
