module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx,js,jsx}',
  ],
  snapshotSerializers: [],
  moduleNameMapper: { '^lodash-es/(.*)$': '<rootDir>/node_modules/lodash/$1' },
  transformIgnorePatterns: [
    '!node_modules/',
    '<rootDir>/node_modules/(?!lodash-es)',
  ],
};
