import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueDOMPurifyHTML from '../src';
import { buildDirective } from '../src/dompurify-html';
import * as dompurifyModule from 'dompurify';
import { ImportMock } from 'ts-mock-imports';

describe('VueDOMPurifyHTML Test Suite', (): void => {
    let sanitizeStub;

    afterEach((): void => {
        if (sanitizeStub) {
            sanitizeStub.restore();
        }
    });

    it('can be used', async (): Promise<void> => {
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

        expect(wrapper.html()).toBe('<p><pre>Hello</pre>\n</p>');
        wrapper.setProps({
            rawHtml: '<pre>Hello<script></script> After Update</pre>'
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toBe('<p><pre>Hello After Update</pre>\n</p>');
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

        expect(wrapperWithHtml.html()).toBe('<p><pre>Hello</pre>\n</p>');
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

        expect(wrapperWithHtml.html()).toBe('<p><pre>Hello</pre>\n</p>');
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

        expect(wrapper.html()).toBe('<p><pre>Hello</pre>\n</p>');
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

    it('fallback to default configured profile when the requested configuration does not exist but a named configuration have been set', (): void => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML, {
            default: {
                USE_PROFILES: { html: false }
            },
            namedConfigurations: {
                svg: {
                    USE_PROFILES: { svg: true }
                }
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

        expect(wrapper.html()).toBe('<p><pre>Hello</pre>\n</p>');
    });

    it('content is given to DOMPurify only when needed', async (): Promise<
        void
    > => {
        sanitizeStub = ImportMock.mockFunction(
            dompurifyModule,
            'sanitize'
        ).callThrough();

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
        expect(wrapper.html()).toBe('<p><pre>Hello</pre>\n</p>');
        wrapper.setProps({
            rawHtml: '<pre>Hello<script></script></pre>'
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toBe('<p><pre>Hello</pre>\n</p>');
        expect(sanitizeStub.callCount).toBe(1);
    });

    it('directive works the same way than v-html when unbounded', async (): Promise<
        void
    > => {
        const localVue = createLocalVue();
        localVue.use(VueDOMPurifyHTML);

        const component = {
            template:
                '<div><p id="purified-p" v-if="display" v-html="rawHtml"></p><p id="pure-p" v-if="display" v-html="rawHtml"></p></div>',
            props: ['rawHtml', 'display']
        };

        const wrapper = shallowMount(component, {
            propsData: {
                rawHtml: 'Test',
                display: true
            },
            localVue
        });

        const purifiedElement = wrapper.find('#purified-p');
        const pureHtmlElement = wrapper.find('#pure-p');
        expect(purifiedElement.html()).toBe('<p id="purified-p">Test</p>');
        expect(purifiedElement.text()).toBe(pureHtmlElement.text());
        expect(wrapper.html()).toBe(
            '<div>\n' +
                '  <p id="purified-p">Test</p>\n' +
                '  <p id="pure-p">Test</p>\n' +
                '</div>'
        );
        wrapper.setProps({
            rawHtml: 'Test',
            display: false
        });
        await wrapper.vm.$nextTick();
        expect(purifiedElement.html()).toBe('<p id="purified-p">Test</p>');
        expect(purifiedElement.text()).toBe(pureHtmlElement.text());
        expect(wrapper.html()).toBe(
            '<div>\n' + '  <!---->\n' + '  <!---->\n' + '</div>'
        );
    });
});
