import { DirectiveFunction, DirectiveOptions, VNodeDirective } from 'vue';
import { sanitize } from 'dompurify';

export interface MinimalDOMPurifyConfig {
    ADD_ATTR?: string[];
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
    [name: string]: MinimalDOMPurifyConfig;
}

export function buildDirective(config: DirectiveConfig = {}): DirectiveOptions {
    const updateComponent: DirectiveFunction = function(
        el: HTMLElement,
        binding: VNodeDirective
    ): void {
        const arg = binding.arg;
        if (arg in config) {
            el.innerHTML = sanitize(binding.value, config[arg]);
            return;
        }
        el.innerHTML = sanitize(binding.value);
    };

    return {
        inserted: updateComponent,
        update: updateComponent
    };
}
