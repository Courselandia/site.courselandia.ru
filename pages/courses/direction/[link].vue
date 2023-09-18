<template>
  <Catalog
    class="mb-24 mb-12-sm"
    section="direction"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/organism/Catalog.vue';

definePageMeta({
  middleware: [
    'course-section-direction',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
