<template>
  <Reviews />
</template>

<script lang="ts" setup>
import Reviews from '@/components/modules/reviews/Index.vue';

definePageMeta({
  middleware: [
    'school-reviews',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
