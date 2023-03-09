<template>
  <Catalog
    class="mb-30 mb-15-sm"
    section="category"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/organism/Catalog.vue';

definePageMeta({
  middleware: [
    'course-section-category',
  ],
});
</script>
