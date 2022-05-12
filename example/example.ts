import { createApp } from 'vue';
import VueDOMPurifyHTML from '../src/';
import Example from './Example.vue';

const app = createApp(Example);

app.use(VueDOMPurifyHTML, {
    namedConfigurations: {
        plaintext: {
            USE_PROFILES: { html: false },
        },
    },
});
app.mount('#app');
