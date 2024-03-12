<template>
  <Catalog
    class="mb-24 mb-12-sm"
    section="category"
  />
</template>

<script lang="ts" setup>
import Catalog from '~/components/modules/catalog/organism/Catalog.vue';

definePageMeta({
  middleware: [
    'course-section-category',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
