import vue from 'rollup-plugin-vue'
import commonJs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { terser } from 'rollup-plugin-terser'
import { createBabelConfig } from './rollup.babel.config'

process.env.NODE_ENV = 'production'

const distPath = 'dist'
const entryPath = 'src/index.ts'

export default {
  input: entryPath,
  output: {
    file: `${distPath}/build.watch.test.js`,
    exports: 'named',
    format: 'esm'
  },
  plugins: [
    vue(),
    postcss({
      minimize: true,
      plugins: [autoprefixer()],
      extract: false
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    babel(createBabelConfig()),
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
