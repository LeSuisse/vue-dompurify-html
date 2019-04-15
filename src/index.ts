import { VueConstructor } from 'vue';
import { buildDirective, DirectiveConfig } from './dompurify-html';

export default {
    install(Vue: VueConstructor, config: DirectiveConfig = {}): void {
        Vue.directive('dompurify-html', buildDirective(config));
    }
};
