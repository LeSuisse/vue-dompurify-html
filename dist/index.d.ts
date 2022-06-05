import { VueConstructor } from 'vue';
import { defaultDOMPurifyInstanceBuilder, DirectiveConfig, MinimalDOMPurifyConfig, DOMPurifyInstanceBuilder } from './dompurify-html';
export { DirectiveConfig, MinimalDOMPurifyConfig, DOMPurifyInstanceBuilder };
export { buildDirective as buildVueDompurifyHTMLDirective } from './dompurify-html';
declare const _default: {
    install(Vue: VueConstructor, config?: DirectiveConfig, buildDOMPurifyInstance?: typeof defaultDOMPurifyInstanceBuilder): void;
};
export default _default;
