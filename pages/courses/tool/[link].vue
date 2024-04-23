<template>
  <Catalog
    section="tool"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section-tool',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
