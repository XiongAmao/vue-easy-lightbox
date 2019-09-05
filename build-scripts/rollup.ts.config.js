import vue from 'rollup-plugin-vue'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'
import { babelConfig } from './rollup.babel.config'

const libraryName = 'vue-easy-lightbox'

const configs = [
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `.temp/${libraryName}.ts.js`,
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
      typescript(),
    ],
    external: ['vue']
  }
]

export default configs
