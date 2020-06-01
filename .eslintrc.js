module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  plugins: [
    'react',
  ],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'comma-dangle': [2, 'always-multiline'],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'object-curly-newline': ['error', {
      ObjectPattern: 'never',
    }],
    'class-methods-use-this': ['error', {
      exceptMethods: [
        'render',
      ],
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
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
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
      pragma: 'React',
      version: '^16.13.1',
    },
  },
};
