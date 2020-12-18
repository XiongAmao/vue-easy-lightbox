/* eslint-disable */
const fs = require('fs-extra')
const path = require('path')

const resolveTypesPath = (...paths) => path.resolve(__dirname, '../types', ...paths)

// remove example types
fs.rmdirSync(resolveTypesPath('./example'), { recursive: true })

// move types/src => types/
fs.readdirSync(resolveTypesPath('./src')).forEach((name) => {
  fs.renameSync(
    resolveTypesPath('./src', name),
    resolveTypesPath(name)
  )
})

// remove types/src/
fs.rmdirSync(resolveTypesPath('./src'))
