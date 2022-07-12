<template>
    <div v-clean-html="rawHtml">Expect text with color</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { buildVueDompurifyHTMLDirective } from 'vue-dompurify-html';

const vCleanHtml = buildVueDompurifyHTMLDirective();
const rawHtml = ref('<span style="color: red">Hello!</span><img src=a onerror="alert(1)">');
</script>
