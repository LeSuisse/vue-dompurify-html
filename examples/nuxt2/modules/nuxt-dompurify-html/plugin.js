import Vue from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const options = JSON.parse('<%= JSON.stringify(options) %>');

Vue.use(VueDOMPurifyHTML, options);
