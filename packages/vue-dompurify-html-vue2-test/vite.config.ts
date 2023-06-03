import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            'vue-demi': resolve(__dirname, './node_modules/vue-demi/'),
        },
    },
    test: {
        environment: 'jsdom',
        watch: false,
    },
});
