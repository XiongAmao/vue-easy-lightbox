import vue from 'rollup-plugin-vue'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import { babelConfig } from './rollup.babel.config'
import { terserOptions } from './rollup.terser.config'

process.env.NODE_ENV = 'production'

const distPath = 'dist'
const libraryName = 'vue-easy-lightbox'
const entryPath = 'src/index.ts'

const builds = [
  `es5.esm.min.js`,
  `esm.min.js`,
  `es5.common.min.js`,
  `common.min.js`,
  `es5.umd.min.js`,
  `umd.min.js`
]

const getFormat = (build) => {
  if (/esm/.test(build)) return 'esm'
  if (/common/.test(build)) return 'cjs'
  if (/umd/.test(build)) return 'umd'
  throw new Error('Unexpected format name.')
}

const configs = builds.map((build) => {
  const format = getFormat(build)
  const config = {
    input: entryPath,
    output: {
      file: `${distPath}/${libraryName}.${build}`,
      format
    },
    plugins: [
      typescript(),
      vue(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonJs(),
      terser(terserOptions)
    ],
    external: ['vue']
  }
  if (config.output.format === 'umd') {
    config.output.name = libraryName
    config.output.globals = { vue: 'Vue' }
  }
  if (/es5/.test(build)) {
    config.plugins.splice(2, 0, babel(babelConfig))
  }

  return config
})

export default configs
