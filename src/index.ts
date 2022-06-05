import { App, Plugin } from 'vue';
import {
    buildDirective,
    DirectiveConfig,
    MinimalDOMPurifyConfig,
    DOMPurifyInstanceBuilder,
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
