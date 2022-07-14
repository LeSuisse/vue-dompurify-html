import VueDOMPurifyHTML from 'vue-dompurify-html';
import Example from './Example.vue';
import Vue from 'vue';

Vue.use(VueDOMPurifyHTML, {
    namedConfigurations: {
        plaintext: {
            USE_PROFILES: { html: false },
        },
    },
});
const App = Vue.extend(Example);
new App().$mount('#app');
