export default {
    modules: [
        [
            '~/modules/nuxt-dompurify-html',
            {
                namedConfigurations: {
                    plaintext: {
                        USE_PROFILES: { html: false },
                    },
                },
            },
        ],
    ],
};
