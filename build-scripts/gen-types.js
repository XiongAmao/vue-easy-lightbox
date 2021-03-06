/* eslint-disable */
const fs = require('fs-extra')
const path = require('path')

const resolveTypesPath = (...paths) => path.resolve(__dirname, '../types', ...paths)

// remove useless types
fs.rmdirSync(resolveTypesPath('./dev-entry'), { recursive: true })
