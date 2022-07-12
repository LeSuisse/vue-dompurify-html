<template>
    <h1>Global directive</h1>
    <div v-dompurify-html="rawHtml">Expect text with color</div>
    <div v-dompurify-html:plaintext="rawHtml">Expect only plaintext</div>
    <h1>Directive local to a component</h1>
    <example-local-directive></example-local-directive>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ExampleLocalDirective from "./ExampleLocalDirective.vue";

const rawHtml = ref('<span style="color: red">Hello!</span><img src=a onerror="alert(1)">');
</script>
