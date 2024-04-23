<template>
  <Collection />
</template>

<script lang="ts" setup>
import Collection from '@/components/modules/collection/Index.vue';

definePageMeta({
  middleware: [
    'collection',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
