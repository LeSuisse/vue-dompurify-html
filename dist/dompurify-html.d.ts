import { DirectiveOptions } from 'vue';
import { HookEvent, HookName, SanitizeAttributeHookEvent, SanitizeElementHookEvent } from 'dompurify';
export interface MinimalDOMPurifyConfig {
    ADD_ATTR?: string[];
    ADD_DATA_URI_TAGS?: string[];
    ADD_TAGS?: string[];
    ALLOW_DATA_ATTR?: boolean;
    ALLOWED_ATTR?: string[];
    ALLOWED_TAGS?: string[];
    FORBID_ATTR?: string[];
    FORBID_TAGS?: string[];
    ALLOWED_URI_REGEXP?: RegExp;
    ALLOW_UNKNOWN_PROTOCOLS?: boolean;
    USE_PROFILES?: false | {
        mathMl?: boolean;
        svg?: boolean;
        svgFilters?: boolean;
        html?: boolean;
    };
}
export interface DirectiveConfig {
    default?: MinimalDOMPurifyConfig;
    namedConfigurations?: Record<string, MinimalDOMPurifyConfig>;
    hooks?: {
        uponSanitizeElement?: (currentNode: Element, data: SanitizeElementHookEvent, config: MinimalDOMPurifyConfig) => void;
        uponSanitizeAttribute?: (currentNode: Element, data: SanitizeAttributeHookEvent, config: MinimalDOMPurifyConfig) => void;
    } & {
        [H in HookName]?: (currentNode: Element, data: HookEvent, config: MinimalDOMPurifyConfig) => void;
    };
}
export declare function buildDirective(config?: DirectiveConfig): DirectiveOptions;
