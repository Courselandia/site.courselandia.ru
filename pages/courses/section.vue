<template>
  <Catalog
    class="mb-24 mb-12-sm"
    section="section"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/organism/Catalog.vue';

definePageMeta({
  middleware: [
    'section',
    'preload-directions',
    'preload-schools',
  ],
  validate: async (route) => route.params.free === 'free' || !route.params.free,
});
</script>
