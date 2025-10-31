const {defineConfig} = require('eslint/config');
const babelParser    = require('@babel/eslint-parser');

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        es6: true,
        node: true
      },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
      }
    },
    rules: {
      'array-bracket-spacing': [
        2,
        'never'
      ],
      'block-scoped-var': 2,
      'brace-style': 0,
      'camelcase': 1,
      'computed-property-spacing': [
        2,
        'never'
      ],
      'curly': 2,
      'eol-last': 2,
      'eqeqeq': [
        2,
        'smart'
      ],
      'max-depth': [
        1,
        4
      ],
      'new-cap': 0,
      'no-extend-native': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-trailing-spaces': 2,
      'no-unused-vars': 0,
      'no-use-before-define': [
        2,
        'nofunc'
      ],
      'object-curly-spacing': [
        2,
        'never'
      ],
      'quotes': [
        2,
        'single',
        'avoid-escape'
      ],
      'semi': [
        2,
        'always'
      ],
      'keyword-spacing': [
        2,
        {
          'before': true,
          'after': true
        }
      ],
      'space-unary-ops': 2
    }
  }
]);
