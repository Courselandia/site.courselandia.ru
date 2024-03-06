<template>
  <Home />
</template>

<script lang="ts" setup>
import Home from '@/components/modules/home/Index.vue';

definePageMeta({
  middleware: [
    'preload-directions',
    'preload-schools',
  ],
});
</script>

<style lang="scss">
@import "assets/scss/components/modules/index";
</style>
