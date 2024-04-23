<template>
  <Catalog
    section="skill"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section-skill',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
