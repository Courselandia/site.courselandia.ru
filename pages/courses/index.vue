<template>
  <Catalog />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
