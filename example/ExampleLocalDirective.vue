<template>
    <div v-clean-html="rawHtml">Expect text with color</div>
</template>

<script setup lang="ts">
import { buildVueDompurifyHTMLDirective } from '../src/';

const vCleanHtml = buildVueDompurifyHTMLDirective();
const rawHtml = '<span style="color: red">Hello!</span><img src=a onerror="alert(1)">';
</script>
