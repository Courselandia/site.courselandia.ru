<template>
  <h1 class="title title--1 header">
    {{ header }}
  </h1>
</template>

<script setup lang="ts">
const props = defineProps({
  header: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publication/atoms/header";
</style>
