<template>
    <div>
        <h1>Directive</h1>
        <div v-dompurify-html="rawHtml">Expect text with color</div>
        <div v-dompurify-html:plaintext="rawHtml">Expect only plaintext</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const rawHtml = ref('<span style="color: red">Hello!</span><img src=a onerror="alert(1)">');
</script>
