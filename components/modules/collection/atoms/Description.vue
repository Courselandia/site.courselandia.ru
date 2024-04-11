<template>
  <div
    class="description"
    v-html="text"
  />
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collection/atoms/description";
</style>
