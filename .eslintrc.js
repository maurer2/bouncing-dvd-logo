module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
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
      // destructuring
      ObjectPattern: {
        minProperties: 4,
        consistent: false,
        multiline: true,
      },
      ObjectExpression: {
        minProperties: 2,
        consistent: false,
        multiline: true,
      },
      ImportDeclaration: {
        minProperties: 4,
        consistent: false,
        multiline: true,
      },
      ExportDeclaration: 'always',
    }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          // {
          //   name: 'styled-components',
          //   message: 'Direct import of styled-components prohibited. Use styled-components/macro instead',
          // },
          {
            name: 'lodash',
            message: 'Please use lodash-es instead of "lodash".',
          },
        ],
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
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent'],
          ['sibling'],
          ['index'],
        ],
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
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // react hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // lodash
    'lodash/import-scope': [2, 'member'],
    'lodash/prefer-lodash-method': 'off',
    // a11y
    'jsx-a11y/media-has-caption': 'off',
  },
  settings: { react: { version: 'detect' } },
  overrides: [
    {
      files: ['**/*.spec.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
