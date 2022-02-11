module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  moduleNameMapper: { '^lodash-es/(.*)$': '<rootDir>/node_modules/lodash/$1' },
  transformIgnorePatterns: [
    '!node_modules/',
    '<rootDir>/node_modules/(?!lodash-es)',
  ],
};
