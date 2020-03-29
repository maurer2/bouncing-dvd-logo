module.exports = {
  processors: [
    'stylelint-processor-styled-components',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-config-rational-order',
  ],
  rules: {
    'block-closing-brace-newline-before': 'always',
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': true,
        'empty-line-between-groups': false,
        severity: 'warning',
      },
    ],
    'selector-pseudo-element-colon-notation': null,
    'selector-type-no-unknown': [true, { ignoreTypes: ['$dummyValue'] }]
  },
};
