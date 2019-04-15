module.exports = (config) => {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "src/**/*.ts", "test/**/*.spec.ts"
    ],
    exclude: [
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    reporters: ['progress', "karma-typescript"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: true,
    concurrency: Infinity
  })
};
