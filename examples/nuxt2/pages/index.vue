<template>
  <div>
    <h1>Directive</h1>
    <div v-dompurify-html="rawHtml" /><!-- Expect text with color -->
    <div v-dompurify-html:plaintext="rawHtml" /><!-- Expect only plaintext -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      rawHtml: '<span style="color: red">Hello!</span><img src=a onerror="alert(1)">'
    }
  }
}
</script>
