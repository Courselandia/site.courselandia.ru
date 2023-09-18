<template>
  <Catalog
    class="mb-24 mb-12-sm"
    section="skill"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/organism/Catalog.vue';

definePageMeta({
  middleware: [
    'course-section-skill',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
