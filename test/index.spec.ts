import { createApp } from 'vue';
import VueDOMPurifyHTML from '../src';

describe('VueDOMPurifyHTML Plugin Install', (): void => {
    it('can be installed', (): void => {
        const el = document.createElement('div');

        const component = {
            setup(): { rawHtml: string } {
                return { rawHtml: '<b>Hello<script></script></b>' };
            },
            template: '<p v-dompurify-html="rawHtml"></p>',
        };

        const app = createApp(component);
        app.use(VueDOMPurifyHTML);
        app.mount(el);

        expect(el.innerHTML).toBe('<p><b>Hello</b></p>');
    });

    it('can be installed with a config', (): void => {
        const el = document.createElement('div');

        const component = {
            setup(): { rawHtml: string } {
                return { rawHtml: '<b>Hello<script></script></b>' };
            },
            template: '<p v-dompurify-html:no-html="rawHtml"></p>',
        };

        const app = createApp(component);
        app.use(VueDOMPurifyHTML, {
            namedConfigurations: {
                'no-html': {
                    USE_PROFILES: { html: false },
                },
            },
        });
        app.mount(el);

        expect(el.innerHTML).toBe('<p>Hello</p>');
    });
});
