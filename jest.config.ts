import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx,js,jsx}',
  ],
  moduleNameMapper: {
    '^lodash-es/(.*)$': '<rootDir>/node_modules/lodash/$1',
    '\\.svg': '<rootDir>/__mocks__/svg.js',
    '\\.(wav)$': '<rootDir>/__mocks__/files.js',
  },
  transformIgnorePatterns: [
    '!node_modules/',
    '<rootDir>/node_modules/(?!lodash-es)',
    '/!node_modules\\/lodash-es/',
  ],
  testEnvironment: 'jest-environment-jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      babelConfig: 'babel.config.js',
      useESM: true,
    },
  },
};

export default config;
