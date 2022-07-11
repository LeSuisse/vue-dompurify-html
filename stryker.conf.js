module.exports = {
    packageManager: 'npm',
    reporters: ['clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    coverageAnalysis: 'off',
    plugins: ["@stryker-mutator/typescript-checker", "@stryker-mutator/jest-runner"],
    checkers: ["typescript"],
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
    thresholds: {
        break: 100,
        high: 100
    }
};
