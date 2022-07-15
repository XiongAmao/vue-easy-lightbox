import path from 'path'
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
  `esm.min.js`,
  `common.min.js`,
  `umd.min.js`,

  'esm.min.external-css.js',
  'umd.min.external-css.js',
  'common.min.external-css.js'
]

const getFormat = (buildType) => {
  if (/esm/.test(buildType)) return 'esm'
  if (/common/.test(buildType)) return 'cjs'
  if (/umd/.test(buildType)) return 'umd'
  throw new Error('Unexpected format name.')
}

const isExternalCSS = (buildText) => {
  return /external-css/.test(buildText)
}

const configs = builds.map((buildType) => {
  const format = getFormat(buildType)
  const config = {
    input: entryPath,
    output: {
      file: isExternalCSS(buildType)
        ? `${distPath}/external-css/${libraryName}.${buildType.replace(
            'external-css.',
            ''
          )}`
        : `${distPath}/${libraryName}.${buildType}`,
      exports: 'named',
      format
    },
    plugins: [
      vue(),
      postcss({
        minimize: true,
        plugins: [autoprefixer()],
        extract: isExternalCSS(buildType)
          ? path.resolve(distPath, `./external-css/${libraryName}.css`)
          : false
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      babel(createBabelConfig(/es5/.test(buildType))),
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
