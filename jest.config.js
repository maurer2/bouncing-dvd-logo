module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
