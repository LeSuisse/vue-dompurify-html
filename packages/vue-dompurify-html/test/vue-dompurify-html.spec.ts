import { mount } from '@vue/test-utils';
import type { DOMPurifyInstanceBuilder } from '../src/dompurify-html';
import { buildDirective } from '../src/dompurify-html';
import type * as DOMPurify from 'dompurify';
import type { DOMPurifyI } from 'dompurify';

const realDOMPurify = jest.requireActual('dompurify');
const sanitizeSpy = jest.fn(realDOMPurify.sanitize);
const addHookSpy = jest.fn(realDOMPurify.addHook);
jest.mock('dompurify', () => {
    return (): DOMPurify.DOMPurifyI => {
        return { ...realDOMPurify, sanitize: sanitizeSpy, addHook: addHookSpy };
    };
});

describe('VueDOMPurifyHTML Test Suite', (): void => {
    beforeEach((): void => {
        sanitizeSpy.mockClear();
    });

    it('can be used', async (): Promise<void> => {
        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };

        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(),
                },
            },
            props: {
                rawHtml: '<pre>Hello<script></script></pre>',
            },
        });

        expect(wrapper.html()).toBe('<p>\n<pre>Hello</pre>\n</p>');
        await wrapper.setProps({
            rawHtml: '<pre>Hello<script></script> After Update</pre>',
        });
        expect(wrapper.html()).toBe('<p>\n<pre>Hello After Update</pre>\n</p>');
    });

    it('can be used with a default config', (): void => {
        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective({
                        default: {
                            USE_PROFILES: { html: false },
                        },
                    }),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
            },
        });

        expect(wrapper.html()).toBe('<p>Hello</p>');
    });

    it('can be used with a custom config', (): void => {
        const directiveOptions = {
            namedConfigurations: {
                'no-html': {
                    USE_PROFILES: { html: false },
                },
            },
        };

        const componentWithHtml = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapperWithHtml = mount(componentWithHtml, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(directiveOptions),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
            },
        });
        const componentWithoutHtml = {
            template: '<p v-dompurify-html:no-html="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapperWithoutHtml = mount(componentWithoutHtml, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(directiveOptions),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
            },
        });

        expect(wrapperWithHtml.html()).toBe('<p>\n<pre>Hello</pre>\n</p>');
        expect(wrapperWithoutHtml.html()).toBe('<p>Hello</p>');
    });

    it('can be used with a custom config when a default config is also specified', (): void => {
        const directiveOptions = {
            default: {
                USE_PROFILES: { html: true },
            },
            namedConfigurations: {
                'no-html': {
                    USE_PROFILES: { html: false },
                },
            },
        };

        const componentWithHtml = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapperWithHtml = mount(componentWithHtml, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(directiveOptions),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
            },
        });
        const componentWithoutHtml = {
            template: '<p v-dompurify-html:no-html="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapperWithoutHtml = mount(componentWithoutHtml, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(directiveOptions),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
            },
        });

        expect(wrapperWithHtml.html()).toBe('<p>\n<pre>Hello</pre>\n</p>');
        expect(wrapperWithoutHtml.html()).toBe('<p>Hello</p>');
    });

    it('can be used with a custom DOMPurify instance builder', async (): Promise<void> => {
        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };

        const instanceBuilder: DOMPurifyInstanceBuilder = () => {
            return {
                sanitize(): string {
                    return 'Test';
                },
            } as unknown as DOMPurifyI;
        };

        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective({}, instanceBuilder),
                },
            },
            props: {
                rawHtml: '<pre>Hello<script></script></pre>',
            },
        });

        expect(wrapper.html()).toBe('<p>Test</p>');
    });

    it('fallback to default (unconfigured) profile when the requested configuration does not exist', (): void => {
        const component = {
            template: '<p v-dompurify-html:donotexist="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective({}),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
            },
        });

        expect(wrapper.html()).toBe('<p>\n<pre>Hello</pre>\n</p>');
    });

    it('fallback to default configured profile when the requested configuration does not exist', (): void => {
        const component = {
            template: '<p v-dompurify-html:donotexist="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective({
                        default: {
                            USE_PROFILES: { html: false },
                        },
                    }),
                },
            },
            props: {
                rawHtml:
                    '<span style="color: red">This should not be red.</span>',
            },
        });

        expect(wrapper.html()).toBe('<p>This should not be red.</p>');
    });

    it('fallback to default configured profile when the requested configuration does not exist but a named configuration have been set', (): void => {
        const component = {
            template: '<p v-dompurify-html:donotexist="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective({
                        default: {
                            USE_PROFILES: { html: false },
                        },
                        namedConfigurations: {
                            svg: {
                                USE_PROFILES: { svg: true },
                            },
                        },
                    }),
                },
            },
            props: {
                rawHtml:
                    '<span style="color: red">This should not be red.</span>',
            },
        });

        expect(wrapper.html()).toBe('<p>This should not be red.</p>');
    });

    it('can build the directive with the default configuration', (): void => {
        const component = {
            template: '<p v-my-directive="rawHtml"></p>',
            props: ['rawHtml'],
        };
        const wrapper = mount(component, {
            global: {
                directives: {
                    'my-directive': buildDirective(),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
            },
        });

        expect(wrapper.html()).toBe('<p>\n<pre>Hello</pre>\n</p>');
    });

    it('content is given to DOMPurify only when needed', async (): Promise<void> => {
        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };

        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(),
                },
            },
            props: {
                rawHtml: '<pre>Hello<script></script></pre>',
            },
        });
        expect(wrapper.html()).toBe('<p>\n<pre>Hello</pre>\n</p>');
        await wrapper.setProps({
            rawHtml: '<pre>Hello<script></script></pre>',
        });
        await wrapper.setProps({
            rawHtml: '<pre>Hello<script></script></pre>',
        });
        expect(wrapper.html()).toBe('<p>\n<pre>Hello</pre>\n</p>');
        expect(sanitizeSpy).toBeCalledTimes(1);
    });

    it('directive works the same way than v-html when unbounded', async (): Promise<void> => {
        const component = {
            template:
                '<div><p id="purified-p" v-if="display" v-html="rawHtml"></p><p id="pure-p" v-if="display" v-html="rawHtml"></p></div>',
            props: ['rawHtml', 'display'],
        };

        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(),
                },
            },
            props: {
                rawHtml: 'Test',
                display: true,
            },
        });

        const purifiedElement = wrapper.find('#purified-p');
        const pureHtmlElement = wrapper.find('#pure-p');
        expect(purifiedElement.element.outerHTML).toBe(
            '<p id="purified-p">Test</p>'
        );
        expect(purifiedElement.text()).toBe(pureHtmlElement.text());
        expect(wrapper.html()).toBe(
            '<div>\n' +
                '  <p id="purified-p">Test</p>' +
                '\n' +
                '  <p id="pure-p">Test</p>' +
                '\n' +
                '</div>'
        );
        await wrapper.setProps({
            rawHtml: 'Test',
            display: false,
        });
        expect(purifiedElement.element.outerHTML).toBe(
            '<p id="purified-p">Test</p>'
        );
        expect(purifiedElement.text()).toBe(pureHtmlElement.text());
        expect(wrapper.html()).toBe(
            '<div>\n  <!--v-if-->\n  <!--v-if-->\n</div>'
        );
    });

    it('can use DOMPurify hooks', async (): Promise<void> => {
        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };

        const uponSanitizeElement = jest.fn();
        const afterSanitizeElements = jest.fn();

        mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective({
                        hooks: {
                            uponSanitizeElement,
                            afterSanitizeElements,
                            beforeSanitizeAttributes: undefined,
                        },
                    }),
                },
            },
            props: {
                rawHtml: '<p>Some element</p>',
            },
        });

        expect(uponSanitizeElement).toHaveBeenCalled();
        expect(afterSanitizeElements).toHaveBeenCalled();
        expect(addHookSpy).toBeCalledTimes(2);
    });

    it('does not rerender when input not changed', async (): Promise<void> => {
        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };

        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(),
                },
            },
            props: {
                rawHtml: '<pre>Hello</pre>',
                otherProp: 'original',
            },
        });

        wrapper.setProps({
            otherProp: 'changed',
        });

        await wrapper.vm.$nextTick();

        expect(sanitizeSpy).toBeCalledTimes(1);
    });

    it.each([
        { input: 0, expected: '0' },
        { input: 1, expected: '1' },
        { input: true, expected: 'true' },
        { input: false, expected: 'false' },
    ])('treats strings like v-html', ({ input, expected }): void => {
        const component = {
            template: '<p v-dompurify-html="rawHtml"></p>',
            props: ['rawHtml'],
        };

        const wrapper = mount(component, {
            global: {
                directives: {
                    'dompurify-html': buildDirective(),
                },
            },
            props: {
                rawHtml: input,
            },
        });

        expect(wrapper.html()).toStrictEqual(`<p>${expected}</p>`);
    });
});
