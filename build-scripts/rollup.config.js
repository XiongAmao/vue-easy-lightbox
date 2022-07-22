import path from 'path'
import vue from 'rollup-plugin-vue'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import autoprefixer from 'autoprefixer'
import { babelConfig } from './rollup.babel.config'
import { terserOptions } from './rollup.terser.config'

process.env.NODE_ENV = 'production'

const distPath = 'dist'
const libraryName = 'vue-easy-lightbox'
const entryPath = 'src/index.ts'

const builds = [
  'es5.esm.min.js',
  'esm.min.js',
  'es5.common.min.js',
  'common.min.js',
  'es5.umd.min.js',
  'umd.min.js',

  'es5.esm.min.external-css.js',
  'esm.min.external-css.js',
  'es5.common.min.external-css.js',
  'common.min.external-css.js',
  'es5.umd.min.external-css.js',
  'umd.min.external-css.js'
]

const getFormat = (build) => {
  if (/esm/.test(build)) return 'esm'
  if (/common/.test(build)) return 'cjs'
  if (/umd/.test(build)) return 'umd'
  throw new Error('Unexpected format name.')
}

const isExternalCSS = (buildText) => {
  return /external-css/.test(buildText)
}

const configs = builds.map((buildType) => {
  const format = getFormat(buildType)
  const isExCSS = isExternalCSS(buildType)

  const config = {
    input: entryPath,
    output: {
      file: isExCSS
        ? `${distPath}/external-css/${libraryName}.${buildType.replace(
            'external-css.',
            ''
          )}`
        : `${distPath}/${libraryName}.${buildType}`,
      format
    },
    plugins: [
      typescript(),
      vue({
        css: !isExCSS,
        style: {
          postcssPlugins: [autoprefixer()]
        }
      }),
      postcss({
        minimize: true,
        plugins: [autoprefixer()],
        extract: isExCSS
          ? path.resolve(distPath, `./external-css/${libraryName}.css`)
          : false
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
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
  if (/es5/.test(buildType)) {
    config.plugins.splice(isExCSS ? 3 : 2, 0, babel(babelConfig))
  }

  return config
})

export default configs
