const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
   // allows you to specify the file patterns for Jest to search for test files.
   testMatch: ["**/**/*.test.ts"],
   // determines the amount of output produced by Jest during test runs.
   verbose: true,
   // determines whether Jest should forcibly terminate the test run once all tests have completed, regardless of whether any asynchronous operations are still pending.
   forceExit: true,
   // determines whether Jest should automatically clear mock calls and instances between tests.
   clearMocks: true,
   // determines whether Jest should reset all mocks between tests.
   resetMocks: true,
   // determines whether Jest should automatically restore all mocks that were manually mocked using jest.mock() after each test.
   restoreMocks: true,
   // allows you to specify an array of directory paths to be searched for modules when running tests.
   modulePaths: ["src"],
};