<template>
    <div v-dompurify-html="rawHtml">Expect text with color</div>
    <div v-dompurify-html:plaintext="rawHtml">Expect only plaintext</div>
</template>

<script setup lang="ts">
const rawHtml = '<span style="color: red">Hello!</span><img src=a onerror="alert(1)">';
</script>
