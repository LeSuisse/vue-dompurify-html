import { VueConstructor } from 'vue';
import { dompurifyHtmlDirective } from './dompurify-html';
export { dompurifyHtmlDirective } from './dompurify-html';

export default {
    install(Vue: VueConstructor): void {
        Vue.directive('dompurify-html', dompurifyHtmlDirective);
    }
};
