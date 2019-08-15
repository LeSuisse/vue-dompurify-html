module.exports = config => {
    config.set({
        mutator: 'typescript',
        packageManager: 'npm',
        reporters: ['clear-text', 'progress', 'dashboard'],
        testRunner: 'jest',
        coverageAnalysis: 'off',
        tsconfigFile: 'tsconfig.json',
        mutate: ['src/**/*.ts'],
        thresholds: {
            break: 100,
            high: 100
        }
    });
};
