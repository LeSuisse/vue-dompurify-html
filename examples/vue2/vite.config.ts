import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // This is not needed in a real app, this is workaround to force using the "right" vue-demi since this
            // monorepo uses Vue 3 by default
            'vue-demi': resolve(__dirname, './node_modules/vue-demi/'),
        },
    },
});
