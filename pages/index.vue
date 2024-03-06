<template>
  <Home />
</template>

<script lang="ts" setup>
import Home from '@/components/modules/home/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['index']);
});

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
