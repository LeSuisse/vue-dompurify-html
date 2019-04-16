module.exports = (config): void  => {
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
        browsers: ["ChromiumHeadless"],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        singleRun: true,
        concurrency: Infinity
    })
};
