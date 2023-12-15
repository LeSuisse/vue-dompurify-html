import VueDOMPurifyHTML from 'vue-dompurify-html';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueDOMPurifyHTML, {
        namedConfigurations: {
            plaintext: {
                USE_PROFILES: { html: false },
            },
        },
    });
});
