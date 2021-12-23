import { App, Plugin } from 'vue';
import {
    buildDirective,
    DirectiveConfig,
    MinimalDOMPurifyConfig,
} from './dompurify-html';
export type { DirectiveConfig, MinimalDOMPurifyConfig };

export const vueDompurifyHTMLPlugin: Plugin = {
    install(app: App, config: DirectiveConfig = {}): void {
        app.directive('dompurify-html', buildDirective(config));
    },
};
export { buildDirective as buildVueDompurifyHTMLDirective } from './dompurify-html';
export default vueDompurifyHTMLPlugin;
