import { Plugin } from 'vue';
import { DirectiveConfig, MinimalDOMPurifyConfig, DOMPurifyInstanceBuilder } from './dompurify-html';
export type { DirectiveConfig, MinimalDOMPurifyConfig, DOMPurifyInstanceBuilder, };
export declare const vueDompurifyHTMLPlugin: Plugin;
export { buildDirective as buildVueDompurifyHTMLDirective } from './dompurify-html';
export default vueDompurifyHTMLPlugin;
