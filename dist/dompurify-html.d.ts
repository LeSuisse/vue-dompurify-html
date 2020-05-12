import { ObjectDirective } from '@vue/runtime-core';
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
}
export declare function buildDirective(config?: DirectiveConfig): ObjectDirective<HTMLElement>;
