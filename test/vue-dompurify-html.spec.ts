import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueDOMPurifyHTML from '../src';
import { buildDirective } from '../src/dompurify-html';

describe('VueDOMPurifyHTML Test Suite', (): void => {
    it('can be used', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML);

        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml']
        };

        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: '<pre>Hello<script></script></pre>'
            },
            localVue
        });

        expect(wrapper.html()).toBe('<p><pre>Hello</pre></p>');
        wrapper.setProps({
            rawHtml: '<pre>Hello<script></script> After Update</pre>'
        });
        expect(wrapper.html()).toBe('<p><pre>Hello After Update</pre></p>');
        wrapper.setProps({
            rawHtml: '<pre>Hello<script></script> After Update</pre>'
        });
        expect(wrapper.html()).toBe('<p><pre>Hello After Update</pre></p>');
    });

    it('can be used with a default config', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {
            default: {
                USE_PROFILES: { html: false }
            }
        });

        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: '<pre>Hello</pre>'
            },
            localVue
        });

        expect(wrapper.html()).toBe('<p>Hello</p>');
    });

    it('can be used with a custom config', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {
            namedConfigurations: {
                'no-html': {
                    USE_PROFILES: { html: false }
                }
            }
        });

        const componentWithHtml = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapperWithHtml = shallowMount(componentWithHtml, {
            propsData: {
                rawHtml: '<pre>Hello</pre>'
            },
            localVue
        });
        const componentWithoutHtml = {
            template: '<p v-dompurify-html:no-html="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapperWithoutHtml = shallowMount(componentWithoutHtml, {
            propsData: {
                rawHtml: '<pre>Hello</pre>'
            },
            localVue
        });

        expect(wrapperWithHtml.html()).toBe('<p><pre>Hello</pre></p>');
        expect(wrapperWithoutHtml.html()).toBe('<p>Hello</p>');
    });

    it('can be used with a custom config when a default config is also specified', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {
            default: {
                USE_PROFILES: { html: true }
            },
            namedConfigurations: {
                'no-html': {
                    USE_PROFILES: { html: false }
                }
            }
        });

        const componentWithHtml = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapperWithHtml = shallowMount(componentWithHtml, {
            propsData: {
                rawHtml: '<pre>Hello</pre>'
            },
            localVue
        });
        const componentWithoutHtml = {
            template: '<p v-dompurify-html:no-html="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapperWithoutHtml = shallowMount(componentWithoutHtml, {
            propsData: {
                rawHtml: '<pre>Hello</pre>'
            },
            localVue
        });

        expect(wrapperWithHtml.html()).toBe('<p><pre>Hello</pre></p>');
        expect(wrapperWithoutHtml.html()).toBe('<p>Hello</p>');
    });

    it('fallback to default (unconfigured) profile when the requested configuration does not exist', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {});

        const component = {
            template: '<p v-dompurify-html:donotexist="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: '<pre>Hello</pre>'
            },
            localVue
        });

        expect(wrapper.html()).toBe('<p><pre>Hello</pre></p>');
    });

    it('fallback to default configured profile when the requested configuration does not exist', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {
            default: {
                USE_PROFILES: { html: false }
            }
        });

        const component = {
            template: '<p v-dompurify-html:donotexist="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml:
                    '<span style="color: red">This should not be red.</span>'
            },
            localVue
        });

        expect(wrapper.html()).toBe('<p>This should not be red.</p>');
    });

    it('can build the directive with the default configuration', (): void => {
        const localVue = createLocalVue();
        localVue.directive('my-directive', buildDirective());

        const component = {
            template: '<p v-my-directive="rawHtml"></p>',
            props: ['rawHtml']
        };
        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: '<pre>Hello</pre>'
            },
            localVue
        });

        expect(wrapper.html()).toBe('<p><pre>Hello</pre></p>');
    });

    it('directive can be unbound from the element', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML);

        const component = {
            template:
                '<div><p v-if="display" v-dompurify-html="rawHtml"></p></div>',
            props: ['rawHtml', 'display']
        };

        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: 'Test',
                display: true
            },
            localVue
        });

        const purifiedElement = wrapper.find('p');
        expect(purifiedElement.html()).toBe('<p>Test</p>');
        expect(wrapper.html()).toBe('<div><p>Test</p></div>');
        wrapper.setProps({
            rawHtml: 'Test',
            display: false
        });
        expect(purifiedElement.html()).toBe('<p></p>');
        expect(wrapper.html()).toBe('<div><!----></div>');
    });
});
