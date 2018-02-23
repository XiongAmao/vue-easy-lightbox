'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack.build.config')
const config = require('./config.js')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const spinner = ora('building for prodction...')
spinner.start()

rm(webpackConfig.output.path, err => {
  if(err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if(err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
