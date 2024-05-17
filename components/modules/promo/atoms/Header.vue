<template>
  <h1 class="title title--1 header">
    Купоны и промокоды {{ name }}
  </h1>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/header";
</style>
