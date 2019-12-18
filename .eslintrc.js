module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-async-in-computed-properties': 'off',
    'vue/no-dupe-keys': 'off',
    'vue/no-duplicate-attributes': 'off',
    'vue/no-parsing-error': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/no-shared-component-data': 'warning',
    'vue/no-side-effects-in-computed-properties': 'warning',
    'vue/no-template-key': 'warning',
    'vue/no-textarea-mustache': 'warning',
    'vue/no-unused-components': 'warning',
    'vue/no-unused-vars': 'warning',
    'vue/no-use-v-if-with-v-for': 'warning',
    'vue/require-component-is': 'warning',
    'vue/require-prop-type-constructor': 'warning',
    'vue/require-render-return': 'off',
    'vue/require-v-for-key': 'warning',
    'vue/require-valid-default-prop': 'warning',
    'vue/return-in-computed-property': 'warning',
    'vue/use-v-on-exact': 'warning',
    'vue/valid-template-root': 'warning',
    'vue/valid-v-bind': 'warning'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
