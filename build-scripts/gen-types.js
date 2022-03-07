/* eslint-disable */
const fs = require('fs-extra')
const path = require('path')

const resolveTypesPath = (...paths) => path.resolve(__dirname, '../types', ...paths)

// remove useless types
fs.rm(resolveTypesPath('./dev-entry'), { recursive: true })
