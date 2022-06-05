import { VueConstructor } from 'vue';
import {
    buildDirective,
    defaultDOMPurifyInstanceBuilder,
    DirectiveConfig,
    MinimalDOMPurifyConfig,
    DOMPurifyInstanceBuilder,
} from './dompurify-html';
export { DirectiveConfig, MinimalDOMPurifyConfig, DOMPurifyInstanceBuilder };

export { buildDirective as buildVueDompurifyHTMLDirective } from './dompurify-html';

export default {
    install(
        Vue: VueConstructor,
        config: DirectiveConfig = {},
        buildDOMPurifyInstance = defaultDOMPurifyInstanceBuilder
    ): void {
        Vue.directive(
            'dompurify-html',
            buildDirective(config, buildDOMPurifyInstance)
        );
    },
};
