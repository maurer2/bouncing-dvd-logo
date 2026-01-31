import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules, fixupPluginRules, includeIgnoreFile } from '@eslint/compat';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import lodash from 'eslint-plugin-lodash';
import prettierPlugin from 'eslint-plugin-prettier';
import reactRedux from 'eslint-plugin-react-redux';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename); // get the name of the directory
const gitignorePath = path.resolve('.', '.gitignore');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const jsConfig = defineConfig([
  // ESLint recommended config
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
  // Strict import rules
  rules.base.importsStrict,
  {
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
      'import-x/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal', 'parent'], ['sibling'], ['index']],
          'newlines-between': 'always',
        },
      ],
      'import-x/consistent-type-specifier-style': 'off', // too rigid, can't mix type and normal inputs
      'import-x/no-anonymous-default-export': [
        'error',
        {
          allowArray: true,
          allowArrowFunction: true,
          allowAnonymousClass: true,
          allowAnonymousFunction: true,
          allowCallExpression: true,
          allowNew: true,
          allowLiteral: true,
          allowObject: true,
        },
      ],
      'import-x/prefer-default-export': 'off',
      // styled components
      // 'import-x/no-namespace': ['error', { ignore: ['**/*.styles.*'] }],
    },
  },
  // Test files overrides
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'import-x/no-rename-default': 'off', // allow importing default components as "Component" in tests
    },
  },
]);

const lodashConfig = defineConfig([
  {
    extends: fixupConfigRules(compat.extends('plugin:lodash/recommended')),
    plugins: {
      lodash: fixupPluginRules(lodash),
    },
    rules: {
      'lodash/import-scope': [2, 'member'],
      'lodash/prefer-lodash-method': 'off',
      'lodash/prefer-lodash-typecheck': 'off',
    },
  },
]);

const reactConfig = defineConfig([
  // React plugin
  plugins.react,
  // React hooks plugin
  plugins.reactHooks,
  // Redux
  ...defineConfig([
    {
      extends: fixupConfigRules(compat.extends('plugin:react-redux/recommended')),
      plugins: {
        'react-redux': fixupPluginRules(reactRedux),
      },
    },
  ]),
  // React JSX A11y plugin
  plugins.reactA11y,
  // Airbnb React recommended config
  ...configs.react.recommended,
  // Strict React rules
  rules.react.strict,

  {
    rules: {
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: false,
          shorthandFirst: false,
          shorthandLast: true,
          ignoreCase: true,
          multiline: 'ignore',
          noSortAlphabetically: true,
          reservedFirst: false,
        },
      ],
    },
  },
]);

const typescriptConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Strict TypeScript rules
  rules.typescript.typescriptEslintStrict,
  // Airbnb React TypeScript config
  ...configs.react.typescript,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  // Zustand and Redux store are properly typed and hooks can safely use inferred types
  {
    files: ['./src/Store2/**.ts', './src/Store/**.ts'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]);

const prettierConfig = defineConfig([
  // Prettier plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
]);

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),
  // Eslintignore
  {
    ignores: ['./vite.config.ts', './__mocks__/**'],
  },
  // JavaScript config
  ...jsConfig,
  // lodash config
  ...lodashConfig,
  // React config
  ...reactConfig,
  // TypeScript config
  ...typescriptConfig,
  // Prettier config
  ...prettierConfig,
]);
