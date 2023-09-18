<template>
  <CourseView class="mb-24 mb-12-sm" />
</template>

<script lang="ts" setup>
import CourseView from '@/components/organism/CourseView.vue';

definePageMeta({
  middleware: [
    'course',
    'preload-directions',
    'preload-schools',
  ],
});
</script>
