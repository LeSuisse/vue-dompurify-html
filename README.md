# vue-dompurify-html

A "safe" replacement for the `v-html` directive. The HTML code is
sanitized with [DOMPurify](https://github.com/cure53/DOMPurify) before being interpreted.

## Installation

```
npm install vue-dompurify-html
```

## Usage

```js
import Vue from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

Vue.use(VueDOMPurifyHTML)

new Vue({
  el: '#app',
  data: {
    rawHtml: '<span style="color: red">This should be red.</span>'
  }
})
```

In your template:
```html
<div id="app">
    <div v-dompurify-html="rawHtml"></div>
</div>
```