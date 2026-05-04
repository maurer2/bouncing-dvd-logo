import type { Config } from 'stylelint';

export default {
  plugins: [
    'stylelint-plugin-defensive-css',
    'stylelint-plugin-logical-css',
    'stylelint-use-nesting',
    'stylelint-high-performance-animation',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-plugin-defensive-css/configs/recommended',
    'stylelint-plugin-defensive-css/configs/accessibility',
    'stylelint-plugin-logical-css/configs/recommended',
  ],
  customSyntax: 'postcss-styled-syntax',
  rules: {
    'block-no-empty': true,
    'plugin/no-low-performance-animation-properties': true,
    'csstools/use-nesting': 'always',
    'defensive-css/require-pure-selectors': [
      null,
      {
        ignoreElements: ['html', 'body', '*'],
        ignoreAttributeModifiers: true,
        severity: 'error',
        strict: true,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.css'],
      customSyntax: undefined,
    },
  ],
} satisfies Config;
