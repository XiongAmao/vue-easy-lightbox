import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import commonJs from 'rollup-plugin-commonjs'

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'test-dist/library.esm.js'
    },
    plugins: [
      commonJs(),
      // css(),
      // vue({ css: false })
      vue()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'test-dist/library.common.js'
    },
    plugins: [
      commonJs(),
      // css(),
      // vue({ css: false })
      vue()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'test-dist/library.umd.js',
      name: 'vue-easy-lightbox'
    },
    plugins: [
      commonJs(),
      // css(),
      // vue({ css: false })
      vue()
    ]
  }
  // {
  //   input: 'src/index.js',
  //   output: {
  //     format: 'iife',
  //     file: 'test-dist/library.iife.js',
  //     name: 'vue-easy-lightbox'
  //   },
  //   plugins: [
  //     commonJs(),
  //     // css(),
  //     // vue({ css: false })
  //     vue()
  //   ]
  // }
]
