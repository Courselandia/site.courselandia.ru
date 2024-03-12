<template>
  <Catalog
    section="profession"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section-profession',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
