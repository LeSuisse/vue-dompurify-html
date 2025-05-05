import VueDOMPurifyHTML from 'vue-dompurify-html';
import DOMPurify from 'isomorphic-dompurify';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(
        VueDOMPurifyHTML,
        {
            namedConfigurations: {
                plaintext: {
                    USE_PROFILES: { html: false },
                },
            },
            enableSSRPropsSupport: true,
        },
        () => DOMPurify,
    );
});
