module.exports = {
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jest.framework.config.js'],
  transform: { '\\.tsx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  coverageReporters: ['html', 'lcov'],
  testMatch: ['<rootDir>/src/**/*.spec.{t,j}s?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
