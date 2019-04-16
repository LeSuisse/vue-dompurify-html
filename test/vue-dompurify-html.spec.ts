import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueDOMPurifyHTML from "../src";

describe('VueDOMPurifyHTML Test Suite', (): void => {
    it('can be used', (): void => {
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

    it('can be used with a custom config', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {
            'no-html': {
                USE_PROFILES: { html: false }
            }
        });

        const componentWithHtml = {
            template: "<p v-dompurify-html=\"rawHtml\"></p>",
            props: ["rawHtml"]
        };
        const wrapperWithHtml = shallowMount(componentWithHtml, {
            propsData: {
                rawHtml: "<pre>Hello</pre>"
            },
            localVue
        });
        const componentWithoutHtml = {
            template: "<p v-dompurify-html:no-html=\"rawHtml\"></p>",
            props: ["rawHtml"]
        };
        const wrapperWithoutHtml = shallowMount(componentWithoutHtml, {
            propsData: {
                rawHtml: "<pre>Hello</pre>"
            },
            localVue
        });

        expect(wrapperWithHtml.html()).toBe('<p><pre>Hello</pre></p>')
        expect(wrapperWithoutHtml.html()).toBe('<p>Hello</p>')
    });

    it('fallback to default profile when the requested configuration does not exist', (): void  => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {});

        const component = {
            template: "<p v-dompurify-html:donotexist=\"rawHtml\"></p>",
            props: ["rawHtml"]
        };
        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: "<pre>Hello</pre>"
            },
            localVue
        });

        expect(wrapper.html()).toBe('<p><pre>Hello</pre></p>')
    });
});
