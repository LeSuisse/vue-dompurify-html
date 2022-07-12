const path = require("path");

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node']
  },
  moduleNameMapper: {
    "^vue$": path.resolve(__dirname, "./node_modules/vue/"),
    "^vue-demi$": path.resolve(__dirname, "./node_modules/vue-demi/"),
  }
};
