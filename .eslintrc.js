module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    indent: 'off',
    'space-before-function-paren': 'off',
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': 'error',
    'vue/comma-dangle': 'error',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/object-curly-spacing': [
      'error',
      'always',
      { arraysInObjects: true, objectsInObjects: true }
    ],
    'vue/html-self-closing': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': 'off',
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/singleline-html-element-content-newline': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}
