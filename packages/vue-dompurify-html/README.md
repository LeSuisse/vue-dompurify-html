# vue-dompurify-html

[![npm](https://img.shields.io/npm/v/vue-dompurify-html)](https://www.npmjs.com/package/vue-dompurify-html)
[![Build Status](https://github.com/LeSuisse/vue-dompurify-html/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/LeSuisse/vue-dompurify-html/actions/workflows/CI.yml?query=branch%3Amain)
[![Code Coverage](https://codecov.io/gh/LeSuisse/vue-dompurify-html/branch/main/graph/badge.svg)](https://codecov.io/gh/LeSuisse/vue-dompurify-html)

A "safe" replacement for the `v-html` directive. The HTML code is
sanitized with [DOMPurify](https://github.com/cure53/DOMPurify) before being interpreted.

This is only a small wrapper around DOMPurify to ease its usage in a Vue app.
You should take a look at the
[DOMPurify Security Goals & Threat Model](https://github.com/cure53/DOMPurify/wiki/Security-Goals-&-Threat-Model)
to understand what are the limitations and possibilities.

## Installation

```
npm install vue-dompurify-html
```

## Usage

The code snippets default to Vue 3, you can see setup examples in both Vue 2 and Vue 3 in the [examples/](../../examples)
folder.

```js
import { createApp } from 'vue';
import App from './App.vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App);
app.use(VueDOMPurifyHTML);
app.mount('#app');
```

In your <abbr title="Single File Component">SFC</abbr>:
```vue
<template>
    <div v-dompurify-html="rawHtml"></div>
</template>
<script setup>
import { ref } from "vue";

const rawHtml = ref('<span style="color: red">This should be red.</span>');
</script>
```


You can also define your [DOMPurify configurations](https://github.com/cure53/DOMPurify#can-i-configure-dompurify):
```js
import { createApp } from 'vue';
import App from './App.vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App);
app.use(VueDOMPurifyHTML, {
    namedConfigurations: {
        'svg': {
            USE_PROFILES: { svg: true }
        },
        'mathml': {
            USE_PROFILES: { mathMl: true }
        },
    }
});
app.mount('#app');
```

Your configuration keys can then be used as an argument of the directive:
```vue
<template>
    <div v-dompurify-html="rawHtml"></div>
    <div v-dompurify-html:svg="svgContent"></div>
</template>
<script setup>
import { ref } from "vue";

const rawHtml = ref('<span style="color: red">This should be red.</span>');
const svgContent = ref('<svg><rect height="50"></rect></svg>');
</script>
```

Alternatively, you can define a default [DOMPurify configuration](https://github.com/cure53/DOMPurify#can-i-configure-dompurify):
```js
import { createApp } from 'vue';
import App from './App.vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App);
app.use(VueDOMPurifyHTML, {
    default: {
        USE_PROFILES: { html: false }
    }
});
app.mount('#app');
```

The `default` [DOMPurify configuration](https://github.com/cure53/DOMPurify#can-i-configure-dompurify) will be used:
```vue
<template>
    <div v-dompurify-html="rawHtml"></div>
</template>
<script setup>
import { ref } from "vue";

const rawHtml = ref('<span style="color: red">This should be red.</span>');
</script>
```

There is also the possibility to set-up [DOMPurify hooks](https://github.com/cure53/DOMPurify#hooks):
```js
import { createApp } from 'vue';
import App from './App.vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App);
app.use(VueDOMPurifyHTML, {
    hooks: {
        uponSanitizeElement: (currentNode) => {
            // Do something with the node
        }
    }
});
app.mount('#app');
```

If needed you can use the directive without installing it globally:

```vue
<template>
    <div v-dompurify-html="rawHtml"></div>
</template>

<script setup lang="ts">
import { buildVueDompurifyHTMLDirective } from '../src/';

const vdompurifyHtml = buildVueDompurifyHTMLDirective(<config...>);
const rawHtml = '<span style="color: red">Hello!</span>';
</script>
```

## Usage with [Nuxt 2](https://nuxtjs.org/)

### Client side

The usage is similar than when directly using Vue.

Define a new Nuxt plugin to import and setup the directive to your liking:

```js
import Vue from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

Vue.use(VueDOMPurifyHTML);
```

and then tell Nuxt to use it as **client-side plugin** in your Nuxt config:

```js
export default {
  plugins: [{ src: '~/plugins/dompurify', mode: 'client' }]
}
```

### Server side or static site generation

The usage is similar than when directly using Vue but you need to setup DOMPurify to work with Node. This is also required in case you are using Nuxt's [full static mode](https://nuxtjs.org/announcements/going-full-static/).

Install this package, DOMPurify and [JSDOM](https://github.com/jsdom/jsdom):

```
npm install vue-dompurify-html dompurify jsdom
```

In your Nuxt config you will need to setup a "server-side" directive:

```js
import { buildVueDompurifyHTMLDirective } from 'vue-dompurify-html';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

export default {
    render: {
        bundleRenderer: {
            directives: {
                'dompurify-html': (el, dir) => {
                    const insertHook = buildVueDompurifyHTMLDirective(
                        {},
                        () => {
                            const window = new JSDOM('').window;
                            return createDOMPurify(window);
                        }
                    ).inserted;
                    insertHook(el, dir);
                    el.data.domProps = { innerHTML: el.innerHTML };
                }
            }
        }
    }
}
```

Note that if you are not using [`injectScripts: false`](https://nuxtjs.org/docs/configuration-glossary/configuration-render/#injectscripts)
in your Nuxt config you will also need to register a client-side plugin as described just before.
