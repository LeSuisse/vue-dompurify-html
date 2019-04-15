import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueDOMPurifyHTML from "../src";

describe('VueDOMPurifyHTML Test Suite', () => {
    it('can be used', () => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML);

        const component = {
            template: "<p v-dompurify-html=\"rawHtml\"></p>",
            props: ["rawHtml"]
        };
        
        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: "<pre>Hello<script></script></pre>"
            },
            localVue
        });

        expect(wrapper.html()).toBe('<p><pre>Hello</pre></p>')
    });
});
