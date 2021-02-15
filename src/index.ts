import { App } from 'vue';
import {
    buildDirective,
    DirectiveConfig,
    MinimalDOMPurifyConfig,
} from './dompurify-html';
export type { DirectiveConfig, MinimalDOMPurifyConfig };

export default {
    install(app: App, config: DirectiveConfig = {}): void {
        app.directive('dompurify-html', buildDirective(config));
    },
};
