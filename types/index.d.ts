import { Plugin } from 'vue';
import { DirectiveConfig, MinimalDOMPurifyConfig } from './dompurify-html';
export type { DirectiveConfig, MinimalDOMPurifyConfig };
export declare const vueDompurifyHTMLPlugin: Plugin;
export { buildDirective as buildVueDompurifyHTMLDirective } from './dompurify-html';
export default vueDompurifyHTMLPlugin;
