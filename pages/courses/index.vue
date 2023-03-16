<template>
  <Catalog class="mb-30 mb-15-sm" />
</template>

<script lang="ts" setup>
import Catalog from '@/components/organism/Catalog.vue';

definePageMeta({
  middleware: [
    'course-section',
  ],
});
</script>
