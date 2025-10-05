import { defineConfig } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import lodash from 'eslint-plugin-lodash';
import reactRedux from 'eslint-plugin-react-redux';
import reactCompiler from 'eslint-plugin-react-compiler';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
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
      ),
    ),

    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      lodash: fixupPluginRules(lodash),
      'react-redux': fixupPluginRules(reactRedux),
      'react-compiler': reactCompiler,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2024,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
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
          devDependencies: [
            '**/*{.,_}{test,spec}.{ts,tsx}',
            '**/setupTests.ts',
            './vite.config.ts',
          ],
          optionalDependencies: false,
        },
      ],

      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'lodash/import-scope': [2, 'member'],
      'lodash/prefer-lodash-method': 'off',
      'lodash/prefer-lodash-typecheck': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    files: ['**/*.spec.tsx'],

    rules: {
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-console': 'off',
    },
  },
]);
