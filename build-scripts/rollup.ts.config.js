import vue from 'rollup-plugin-vue'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import { babelConfig } from './rollup.babel.config'

const libraryName = 'vue-easy-lightbox'

const configs = [
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `test-dist/${libraryName}.ts.js`,
      name: libraryName,
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      typescript(),
      vue({ needMap: false }),
      babel(babelConfig),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      resolve(),
      commonJs()
    ],
    external: ['vue']
  }
]

export default configs
