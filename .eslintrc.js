module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:lodash/recommended',
    'plugin:react/recommended',
    'plugin:react-redux/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'lodash', 'react-redux'],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    // general
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Please use lodash-es instead of "lodash".',
          },
        ],
      },
    ],
    'no-restricted-exports': 'off',
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
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*{.,_}{test,spec}.{ts,tsx}', '**/setupTests.ts', './vite.config.ts'],
        optionalDependencies: false,
      },
    ],
    // typescript
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/consistent-type-imports': 'warn',
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
  parserOptions: {
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['**/*.spec.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-console': 'off',
      },
    },
  ],
};
