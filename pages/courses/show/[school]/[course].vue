<template>
  <Course />
</template>

<script lang="ts" setup>
import Course from '@/components/modules/course/Index.vue';

definePageMeta({
  middleware: [
    'course',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
