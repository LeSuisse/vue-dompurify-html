import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'VueDOMPurifyHTML',
        },
        rollupOptions: {
            external: ['dompurify', 'vue-demi'],
            output: {
                globals: {
                    dompurify: 'DOMPurify',
                    'vue-demi': 'VueDemi',
                },
                exports: 'named',
            },
        },
    },
    optimizeDeps: {
        exclude: ['vue-demi'],
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
