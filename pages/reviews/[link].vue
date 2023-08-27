<template>
  <SchoolReview />
</template>

<script lang="ts" setup>
import SchoolReview from '@/components/organism/SchoolReview.vue';

definePageMeta({
  middleware: [
    'school-reviews',
  ],
});
</script>
