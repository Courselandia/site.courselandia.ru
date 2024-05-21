<template>
  <Promo />
</template>

<script lang="ts" setup>
import Promo from '@/components/modules/promo/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['promos']);
});

definePageMeta({
  middleware: [
    'promo',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
