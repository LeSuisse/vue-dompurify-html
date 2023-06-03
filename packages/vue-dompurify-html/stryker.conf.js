module.exports = {
    packageManager: 'pnpm',
    reporters: ['clear-text', 'progress', 'dashboard'],
    testRunner: 'vitest',
    coverageAnalysis: 'off',
    plugins: ["@stryker-mutator/typescript-checker", "@stryker-mutator/vitest-runner"],
    checkers: ["typescript"],
    tsconfigFile: 'tsconfig.test.json',
    mutate: ['src/**/*.ts'],
    thresholds: {
        break: 100,
        high: 100
    }
};
