import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'VueDOMPurifyHTML',
        },
        rollupOptions: {
            external: ['isomorphic-dompurify'],
            output: {
                globals: {
                    dompurify: 'DOMPurify',
                },
                exports: 'named',
            },
        },
    },
    test: {
        environment: 'jsdom',
        watch: false,
        coverage: {
            provider: 'v8',
            enabled: true,
            exclude: [...configDefaults.coverage.exclude, 'stryker.conf.js'],
        },
    },
});
