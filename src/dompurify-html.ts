import { DirectiveOptions, VNodeDirective } from "vue";
import { sanitize } from "dompurify";

export const dompurifyHtmlDirective: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective) {
        el.innerHTML = sanitize(binding.value);
    }
};
