export const babelConfig = {
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
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: false,
        useESModules: true
      }
    ]
  ],
  exclude: 'node_modules/**'
}
