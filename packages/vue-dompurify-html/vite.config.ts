import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'VueDOMPurifyHTML',
        },
        rollupOptions: {
            external: ['dompurify'],
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
        },
    },
});
