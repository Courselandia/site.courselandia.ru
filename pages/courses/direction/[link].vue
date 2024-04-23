<template>
  <Catalog
    section="direction"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section-direction',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
