<template>
  <Catalog
    section="category"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section-category',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
