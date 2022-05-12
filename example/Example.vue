<template>
    <h1>Global directive</h1>
    <div v-dompurify-html="rawHtml">Expect text with color</div>
    <div v-dompurify-html:plaintext="rawHtml">Expect only plaintext</div>
    <h1>Directive local to a component</h1>
    <example-local-directive />
</template>

<script setup lang="ts">
import ExampleLocalDirective from "./ExampleLocalDirective.vue";

const rawHtml = '<span style="color: red">Hello!</span><img src=a onerror="alert(1)">';
</script>
