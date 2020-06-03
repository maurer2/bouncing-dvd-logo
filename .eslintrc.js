module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:lodash/recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'lodash',
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    // general
    quotes: [2, 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'comma-dangle': [2, 'always-multiline'],
    'object-curly-newline': ['error', {
      ObjectPattern: 'never',
    }],
    'no-restricted-imports': [
      'error',
      {
        paths: [{
          name: 'styled-components',
          message: 'Direct import of styled-components prohibited. Use styled-components/macro instead',
        }],
        patterns: [
          '!styled-components/macro',
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      // following endings should never be added to imports
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal', 'parent'], ['sibling'], ['index']],
        'newlines-between': 'always',
      },
    ],
    'no-useless-constructor': 'off',
    // typescript
    '@typescript-eslint/no-useless-constructor': 'error',
    // react
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // react hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // lodash
    'lodash/import-scope': [2, 'member'],
    'lodash/prefer-lodash-method': 'off',
  },
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
