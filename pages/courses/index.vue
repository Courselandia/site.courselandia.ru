<template>
  <Catalog class="mb-24 mb-12-sm" />
</template>

<script lang="ts" setup>
import Catalog from '@/components/organism/Catalog.vue';

definePageMeta({
  middleware: [
    'course-section',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
