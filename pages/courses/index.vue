<template>
  <div>
    HERE 2!
  </div>
</template>

<script lang="ts" setup>
// import Catalog from '@/components/modules/catalog/Index.vue';

definePageMeta({
  middleware: [
    'course-section',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
