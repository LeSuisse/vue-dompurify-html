import {
    DirectiveHook,
    ObjectDirective,
    DirectiveBinding,
} from '@vue/runtime-core';
import dompurify from 'dompurify';
import {
    DOMPurifyI,
    HookEvent,
    HookName,
    SanitizeAttributeHookEvent,
    SanitizeElementHookEvent,
} from 'dompurify';

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
    ALLOWED_URI_REGEXP?: RegExp | undefined;
    ALLOW_UNKNOWN_PROTOCOLS?: boolean | undefined;
    USE_PROFILES?:
        | false
        | {
              mathMl?: boolean | undefined;
              svg?: boolean | undefined;
              svgFilters?: boolean | undefined;
              html?: boolean | undefined;
          }
        | undefined;
    CUSTOM_ELEMENT_HANDLING?: {
        tagNameCheck?:
            | RegExp
            | ((tagName: string) => boolean)
            | null
            | undefined;
        attributeNameCheck?:
            | RegExp
            | ((lcName: string) => boolean)
            | null
            | undefined;
        allowCustomizedBuiltInElements?: boolean | undefined;
    };
}

export interface DirectiveConfig {
    default?: MinimalDOMPurifyConfig | undefined;
    namedConfigurations?: Record<string, MinimalDOMPurifyConfig> | undefined;
    hooks?: {
        uponSanitizeElement?:
            | ((
                  currentNode: Element,
                  data: SanitizeElementHookEvent,
                  config: MinimalDOMPurifyConfig
              ) => void)
            | undefined;
        uponSanitizeAttribute?:
            | ((
                  currentNode: Element,
                  data: SanitizeAttributeHookEvent,
                  config: MinimalDOMPurifyConfig
              ) => void)
            | undefined;
    } & {
        [H in HookName]?:
            | ((
                  currentNode: Element,
                  data: HookEvent,
                  config: MinimalDOMPurifyConfig
              ) => void)
            | undefined;
    };
}

function setUpHooks(
    config: DirectiveConfig,
    dompurifyInstance: DOMPurifyI
): void {
    const hooks = config.hooks ?? {};

    let hookName: HookName;
    for (hookName in hooks) {
        const hook = hooks[hookName];
        if (hook !== undefined) {
            dompurifyInstance.addHook(hookName, hook);
        }
    }
}

export function buildDirective(
    config: DirectiveConfig = {}
): ObjectDirective<HTMLElement> {
    const dompurifyInstance = dompurify();

    setUpHooks(config, dompurifyInstance);

    const updateComponent: DirectiveHook = function (
        el: HTMLElement,
        binding: DirectiveBinding
    ): void {
        const arg = binding.arg;
        const namedConfigurations = config.namedConfigurations;
        const defaultConfig = config.default ?? {};
        // Stryker disable next-line ConditionalExpression: Do not see that transforming arg !== undefined to true is rejected by TS
        if (namedConfigurations && arg !== undefined) {
            el.innerHTML = dompurifyInstance.sanitize(
                binding.value,
                namedConfigurations[arg] ?? defaultConfig
            );
            return;
        }
        el.innerHTML = dompurifyInstance.sanitize(binding.value, defaultConfig);
    };

    return {
        mounted: updateComponent,
        updated: updateComponent,
    };
}
