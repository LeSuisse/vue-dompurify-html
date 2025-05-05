import type { ObjectDirective } from 'vue';
import type { DOMPurify, UponSanitizeElementHookEvent, UponSanitizeAttributeHookEvent } from 'dompurify';
type MinimalDOMPurifyInstance = Pick<DOMPurify, 'sanitize' | 'addHook'>;
export type DOMPurifyInstanceBuilder = () => MinimalDOMPurifyInstance;
export interface MinimalDOMPurifyConfig {
    ADD_ATTR?: string[] | undefined;
    ADD_DATA_URI_TAGS?: string[] | undefined;
    ADD_TAGS?: string[] | undefined;
    ALLOW_DATA_ATTR?: boolean | undefined;
    ALLOWED_ATTR?: string[] | undefined;
    ALLOWED_TAGS?: string[] | undefined;
    FORBID_ATTR?: string[] | undefined;
    FORBID_CONTENTS?: string[] | undefined;
    FORBID_TAGS?: string[] | undefined;
    FORCE_BODY?: boolean | undefined;
    ALLOWED_URI_REGEXP?: RegExp | undefined;
    ALLOW_UNKNOWN_PROTOCOLS?: boolean | undefined;
    USE_PROFILES?: false | {
        mathMl?: boolean | undefined;
        svg?: boolean | undefined;
        svgFilters?: boolean | undefined;
        html?: boolean | undefined;
    } | undefined;
    CUSTOM_ELEMENT_HANDLING?: {
        tagNameCheck?: RegExp | ((tagName: string) => boolean) | null | undefined;
        attributeNameCheck?: RegExp | ((lcName: string) => boolean) | null | undefined;
        allowCustomizedBuiltInElements?: boolean | undefined;
    };
    SANITIZE_NAMED_PROPS?: boolean | undefined;
}
export interface DirectiveConfig {
    default?: MinimalDOMPurifyConfig | undefined;
    namedConfigurations?: Record<string, MinimalDOMPurifyConfig> | undefined;
    hooks?: {
        uponSanitizeElement?: ((currentNode: Node, hookEvent: UponSanitizeElementHookEvent, config: MinimalDOMPurifyConfig) => void) | undefined;
        uponSanitizeAttribute?: ((currentNode: Element, hookEvent: UponSanitizeAttributeHookEvent, config: MinimalDOMPurifyConfig) => void) | undefined;
    } & {
        [H in 'beforeSanitizeElements' | 'afterSanitizeElements' | 'uponSanitizeShadowNode']?: ((currentNode: Node, hookEvent: null, config: MinimalDOMPurifyConfig) => void) | undefined;
    } & {
        [H in 'beforeSanitizeAttributes' | 'afterSanitizeAttributes']?: ((currentNode: Element, hookEvent: null, config: MinimalDOMPurifyConfig) => void) | undefined;
    } & {
        [H in 'beforeSanitizeShadowDOM' | 'afterSanitizeShadowDOM']?: ((currentNode: DocumentFragment, hookEvent: null, config: MinimalDOMPurifyConfig) => void) | undefined;
    };
    enableSSRPropsSupport?: boolean | undefined;
}
export declare function defaultDOMPurifyInstanceBuilder(): MinimalDOMPurifyInstance;
export declare function buildDirective(config?: DirectiveConfig, buildDOMPurifyInstance?: DOMPurifyInstanceBuilder): ObjectDirective<HTMLElement>;
export {};
