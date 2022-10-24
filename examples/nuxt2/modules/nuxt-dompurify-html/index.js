import path from 'path';
import { buildVueDompurifyHTMLDirective } from 'vue-dompurify-html';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const dompurifyModule = function (moduleOptions) {
    this.nuxt.hook('render:before', (_, options) => {
        options.bundleRenderer.directives = {
            ...options.bundleRenderer.directives,
            'dompurify-html': (el, dir) => {
                const insertHook = buildVueDompurifyHTMLDirective(
                    moduleOptions,
                    () => {
                        const window = new JSDOM('').window;
                        return createDOMPurify(window);
                    }
                ).inserted;
                insertHook(el, dir, undefined, undefined);
                if (el.innerHTML != null) {
                    el.data.domProps = { innerHTML: el.innerHTML };
                }
            },
        };
    });

    this.addPlugin({
        src: path.resolve(__dirname, 'plugin.js'),
        options: moduleOptions,
    });
};

export default dompurifyModule;
