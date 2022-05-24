module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node']
  },
};
