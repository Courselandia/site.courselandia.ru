<template>
  <Publication />
</template>

<script lang="ts" setup>
import Publication from '@/components/modules/publication/Index.vue';

definePageMeta({
  middleware: [
    'publication',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
