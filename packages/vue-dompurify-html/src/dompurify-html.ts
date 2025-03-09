import type { DirectiveHook, ObjectDirective, DirectiveBinding } from 'vue';
import dompurify from 'dompurify';
import type {
    DOMPurify,
    UponSanitizeElementHookEvent,
    UponSanitizeAttributeHookEvent,
    HookName,
} from 'dompurify';

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
    SANITIZE_NAMED_PROPS?: boolean | undefined;
}

export interface DirectiveConfig {
    default?: MinimalDOMPurifyConfig | undefined;
    namedConfigurations?: Record<string, MinimalDOMPurifyConfig> | undefined;
    hooks?: {
        uponSanitizeElement?:
            | ((
                  currentNode: Node,
                  hookEvent: UponSanitizeElementHookEvent,
                  config: MinimalDOMPurifyConfig,
              ) => void)
            | undefined;
        uponSanitizeAttribute?:
            | ((
                  currentNode: Element,
                  hookEvent: UponSanitizeAttributeHookEvent,
                  config: MinimalDOMPurifyConfig,
              ) => void)
            | undefined;
    } & {
        [H in
            | 'beforeSanitizeElements'
            | 'afterSanitizeElements'
            | 'uponSanitizeShadowNode']?:
            | ((
                  currentNode: Node,
                  hookEvent: null,
                  config: MinimalDOMPurifyConfig,
              ) => void)
            | undefined;
    } & {
        [H in 'beforeSanitizeAttributes' | 'afterSanitizeAttributes']?:
            | ((
                  currentNode: Element,
                  hookEvent: null,
                  config: MinimalDOMPurifyConfig,
              ) => void)
            | undefined;
    } & {
        [H in 'beforeSanitizeShadowDOM' | 'afterSanitizeShadowDOM']?:
            | ((
                  currentNode: DocumentFragment,
                  hookEvent: null,
                  config: MinimalDOMPurifyConfig,
              ) => void)
            | undefined;
    };
}

function setUpHooks(
    config: DirectiveConfig,
    dompurifyInstance: MinimalDOMPurifyInstance,
): void {
    const hooks = config.hooks ?? {};

    let hookName: HookName;
    for (hookName in hooks) {
        const hook = hooks[hookName];
        if (hook !== undefined) {
            // @ts-expect-error Overload cannot be properly identified, in any cases they will be adjusted https://github.com/cure53/DOMPurify/pull/1031
            dompurifyInstance.addHook(hookName, hook);
        }
    }
}

export function defaultDOMPurifyInstanceBuilder(): MinimalDOMPurifyInstance {
    return dompurify();
}

export function buildDirective(
    config: DirectiveConfig = {},
    buildDOMPurifyInstance: DOMPurifyInstanceBuilder = defaultDOMPurifyInstanceBuilder,
): ObjectDirective<HTMLElement> {
    const dompurifyInstance = buildDOMPurifyInstance();

    setUpHooks(config, dompurifyInstance);

    const sanitizeContentFromBindingValue = function (
        binding: DirectiveBinding<HTMLElement>,
    ): string | undefined {
        const current_value = binding.value;
        if (binding.oldValue === current_value) {
            return undefined;
        }
        const current_value_string = `${current_value}`;
        const arg = binding.arg;
        const namedConfigurations = config.namedConfigurations;
        const defaultConfig = config.default ?? {};
        if (namedConfigurations && arg !== undefined) {
            return dompurifyInstance.sanitize(
                current_value_string,
                namedConfigurations[arg] ?? defaultConfig,
            );
        }
        return dompurifyInstance.sanitize(current_value_string, defaultConfig);
    };

    const updateComponent: DirectiveHook = function (
        el: HTMLElement,
        binding: DirectiveBinding<HTMLElement>,
    ): void {
        const sanitized_content = sanitizeContentFromBindingValue(binding);
        if (sanitized_content === undefined) {
            return;
        }

        el.innerHTML = sanitized_content;
    };

    return {
        mounted: updateComponent,
        updated: updateComponent,
        getSSRProps(binding: DirectiveBinding<HTMLElement>) {
            return {
                innerHTML: sanitizeContentFromBindingValue(binding),
            };
        },
    };
}
