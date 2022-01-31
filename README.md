# vue-dompurify-html

[![npm](https://img.shields.io/npm/v/vue-dompurify-html)](https://www.npmjs.com/package/vue-dompurify-html)
[![Build Status](https://travis-ci.com/LeSuisse/vue-dompurify-html.svg?branch=master)](https://travis-ci.com/LeSuisse/vue-dompurify-html)
[![Code Coverage](https://codecov.io/gh/LeSuisse/vue-dompurify-html/branch/master/graph/badge.svg)](https://codecov.io/gh/LeSuisse/vue-dompurify-html)

⚠️ This branch is meant to be used with [Vue 3](https://github.com/vuejs/vue-next). If you are looking for a version compatible with Vue 2,
go to [master branch](https://github.com/LeSuisse/vue-dompurify-html/tree/master).

A "safe" replacement for the `v-html` directive. The HTML code is
sanitized with [DOMPurify](https://github.com/cure53/DOMPurify) before being interpreted.

This is only a small wrapper around DOMPurify to ease its usage in a Vue app.
You should take a look at the 
[DOMPurify Security Goals & Threat Model](https://github.com/cure53/DOMPurify/wiki/Security-Goals-&-Threat-Model)
to understand what are the limitations and possibilities.

## Installation

```
npm install vue-dompurify-html@vue-next
```

## Usage

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
