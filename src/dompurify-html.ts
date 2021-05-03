import { DirectiveFunction, DirectiveOptions, VNodeDirective } from 'vue';
import {
    HookEvent,
    HookName,
    sanitize,
    addHook,
    SanitizeAttributeHookEvent,
    SanitizeElementHookEvent,
} from 'dompurify';

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
    hooks?: {
        uponSanitizeElement?: (
            currentNode: Element,
            data: SanitizeElementHookEvent,
            config: MinimalDOMPurifyConfig
        ) => void;
        uponSanitizeAttribute?: (
            currentNode: Element,
            data: SanitizeAttributeHookEvent,
            config: MinimalDOMPurifyConfig
        ) => void;
    } & {
        [H in HookName]?: (
            currentNode: Element,
            data: HookEvent,
            config: MinimalDOMPurifyConfig
        ) => void;
    };
}

function setUpHooks(config: DirectiveConfig): void {
    const hooks = config.hooks;

    let hookName: HookName;
    for (hookName in hooks) {
        addHook(hookName, hooks[hookName]);
    }
}

export function buildDirective(config: DirectiveConfig = {}): DirectiveOptions {
    setUpHooks(config);

    const updateComponent: DirectiveFunction = function (
        el: HTMLElement,
        binding: VNodeDirective
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
        inserted: updateComponent,
        update: updateComponent,
    };
}
