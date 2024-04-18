<template>
  <div
    class="article lists links"
    v-html="article"
  />
</template>

<script setup lang="ts">
defineProps({
  article: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publication/atoms/article";
</style>
