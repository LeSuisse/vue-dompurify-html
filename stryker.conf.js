module.exports = config => {
    config.set({
        mutator: 'typescript',
        packageManager: 'npm',
        reporters: ['clear-text', 'progress', 'dashboard'],
        testRunner: 'karma',
        testFramework: 'jasmine',
        coverageAnalysis: 'off',
        karma: {
            configFile: 'karma.conf.ts'
        },
        tsconfigFile: 'tsconfig.json',
        mutate: ['src/**/*.ts'],
        thresholds: {
            break: 91.3
        }
    });
};
