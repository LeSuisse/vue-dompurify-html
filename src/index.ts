import { VueConstructor } from 'vue';
import { buildDirective, DirectiveConfig, MinimalDOMPurifyConfig } from './dompurify-html';
export { DirectiveConfig, MinimalDOMPurifyConfig }

export default {
    install(Vue: VueConstructor, config: DirectiveConfig = {}): void {
        Vue.directive('dompurify-html', buildDirective(config));
    }
};
