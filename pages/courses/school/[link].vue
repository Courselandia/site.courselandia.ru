<template>
  <Catalog
    section="school"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section-school',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
