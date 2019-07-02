import vue from 'rollup-plugin-vue'
// import css from 'rollup-plugin-css-only'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const babelConfig = {
  babelrc: false,
  runtimeHelpers: true,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: false,
        useBuiltIns: 'usage'
      }
    ],
    ['@vue/babel-preset-jsx', {}]
  ],
  // plugins: [
  //   [
  //     '@babel/plugin-transform-runtime',
  //     {
  //       regenerator: false,
  //       corejs: false,
  //       helpers: true,
  //       useESModules: true
  //     }
  //   ]
  // ],
  exclude: 'node_modules/**' // only transpile our source code
}

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'test-dist/library.esm.js',
      name: 'vue-easy-lightbox'
    },
    plugins: [
      vue(),
      babel(babelConfig),
      resolve(),
      commonJs()
    ]
  }
  // {
  //   input: 'src/index.js',
  //   output: {
  //     format: 'cjs',
  //     file: 'test-dist/library.common.js'
  //   },
  //   plugins: [
  //     commonJs(),
  //     // css(),
  //     // vue({ css: false })
  //     vue()
  //   ]
  // },
  // {
  //   input: 'src/index.js',
  //   output: {
  //     format: 'umd',
  //     file: 'test-dist/library.umd.js',
  //     name: 'vue-easy-lightbox'
  //   },
  //   plugins: [
  //     commonJs(),
  //     // css(),
  //     // vue({ css: false })
  //     vue()
  //   ]
  // }
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
