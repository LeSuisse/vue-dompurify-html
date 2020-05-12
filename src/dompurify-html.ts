import {
    DirectiveHook,
    ObjectDirective,
    DirectiveBinding,
} from '@vue/runtime-core';
import { sanitize } from 'dompurify';

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
    USE_PROFILES?:
        | false
        | {
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

export function buildDirective(
    config: DirectiveConfig = {}
): ObjectDirective<HTMLElement> {
    const updateComponent: DirectiveHook = function (
        el: HTMLElement,
        binding: DirectiveBinding
    ): void {
        const arg = binding.arg;
        const namedConfigurations = config.namedConfigurations;
        if (
            namedConfigurations &&
            typeof namedConfigurations[arg] !== 'undefined'
        ) {
            el.innerHTML = sanitize(binding.value, namedConfigurations[arg]);
            return;
        }
        el.innerHTML = sanitize(binding.value, config.default);
    };

    return {
        mounted: updateComponent,
        updated: updateComponent,
    };
}
