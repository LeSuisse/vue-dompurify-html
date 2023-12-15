<template>
    <h1>Global directive</h1>
    <div v-dompurify-html="rawHtml">Expect text with color</div>
    <div v-dompurify-html:plaintext="rawHtml">Expect only plaintext</div>
    <h1>Directive local to a component</h1>
    <div v-clean-html="rawHtml">Expect text with color</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { buildVueDompurifyHTMLDirective } from 'vue-dompurify-html';

const rawHtml = ref('<span style="color: red">Hello!</span><img src=a onerror="alert(1)">');

const vCleanHtml = buildVueDompurifyHTMLDirective();
</script>
