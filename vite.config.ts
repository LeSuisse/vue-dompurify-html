import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
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
});
