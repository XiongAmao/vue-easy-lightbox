import vue from 'rollup-plugin-vue'
import commonJs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { terser } from 'rollup-plugin-terser'
import Case from 'case'
import { createBabelConfig } from './rollup.babel.config'

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
      exports: 'named',
      format
    },
    plugins: [
      vue(),
      postcss({
        minimize: true,
        plugins: [autoprefixer()]
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      babel(createBabelConfig(/es5/.test(build))),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        browser: true
      }),
      commonJs(),
      terser({
        format: {
          comments: false
        }
      })
    ],
    external: ['vue']
  }
  if (config.output.format === 'umd') {
    config.output.name = Case.pascal(libraryName)
    config.output.globals = { vue: 'Vue' }
    config.output.exports = 'default'
  }

  return config
})

export default configs
