import { DirectiveOptions, VNodeDirective } from "vue";
import DOMPurify from "dompurify";

export const dompurifyHtmlDirective: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective) {
        el.innerHTML = DOMPurify.sanitize(binding.value);
    }
};
