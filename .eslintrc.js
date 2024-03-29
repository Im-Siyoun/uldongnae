module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: ['airbnb-base'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-empty-function': 'off',
    'no-unused-vars': 'off',
    'new-cap': 'off',
    'implicit-arrow-linebreak': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'object-curly-newline': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'max-len': ['error', { code: 80, tabWidth: 2 }],
    'newline-before-return': 'error',
    'no-useless-constructor': 'off',
    'no-param-reassign': 'off',
  },
};
