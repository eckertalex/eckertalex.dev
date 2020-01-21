module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended', 'react-app', 'prettier'],
  plugins: ['react-hooks', 'react'],
  rules: {
    'no-unused-vars': ['warn'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': 'warn',
    strict: 0,
  },
}
