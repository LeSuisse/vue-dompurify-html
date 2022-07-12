import type { App, Plugin } from 'vue-demi';
import type {
    DirectiveConfig,
    MinimalDOMPurifyConfig,
    DOMPurifyInstanceBuilder,
} from './dompurify-html';
import {
    buildDirective,
    defaultDOMPurifyInstanceBuilder,
} from './dompurify-html';
export type {
    DirectiveConfig,
    MinimalDOMPurifyConfig,
    DOMPurifyInstanceBuilder,
};

export const vueDompurifyHTMLPlugin: Plugin = {
    install(
        app: App,
        config: DirectiveConfig = {},
        buildDOMPurifyInstance: DOMPurifyInstanceBuilder = defaultDOMPurifyInstanceBuilder
    ): void {
        app.directive(
            'dompurify-html',
            buildDirective(config, buildDOMPurifyInstance)
        );
    },
};
export { buildDirective as buildVueDompurifyHTMLDirective } from './dompurify-html';
export default vueDompurifyHTMLPlugin;
