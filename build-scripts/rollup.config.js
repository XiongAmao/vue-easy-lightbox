import vue from 'rollup-plugin-vue'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { babelConfig } from './rollup.babel.config'
import { terserOptions } from './rollup.terser.config'

process.env.NODE_ENV = 'production'

const distPath = 'dist'
const libraryName = 'vue-easy-lightbox'

const configs = [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: `${distPath}/${libraryName}.es5.esm.min.js`
    },
    plugins: [
      vue(),
      babel(babelConfig),
      resolve(),
      commonJs(),
      terser(terserOptions)
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: `${distPath}/${libraryName}.esm.min.js`
    },
    plugins: [
      vue(),
      resolve(),
      commonJs(),
      terser(terserOptions)
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: `${distPath}/${libraryName}.es5.common.min.js`
    },
    plugins: [
      vue(),
      babel(babelConfig),
      resolve(),
      commonJs(),
      terser(terserOptions)
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: `${distPath}/${libraryName}.common.min.js`
    },
    plugins: [
      vue(),
      resolve(),
      commonJs(),
      terser(terserOptions)
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: `${distPath}/${libraryName}.es5.umd.min.js`,
      name: libraryName,
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      vue(),
      babel(babelConfig),
      resolve(),
      commonJs(),
      terser(terserOptions)
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: `${distPath}/${libraryName}.umd.min.js`,
      name: libraryName,
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      vue(),
      resolve(),
      commonJs(),
      terser(terserOptions)
    ]
  }
]

configs.forEach(config => {
  config.external = ['vue']
})

export default configs
