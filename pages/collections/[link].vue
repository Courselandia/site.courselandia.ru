<template>
  <Collection />
</template>

<script lang="ts" setup>
import Collection from '@/components/modules/collection/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['collections']);
});

definePageMeta({
  middleware: [
    'collection',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
