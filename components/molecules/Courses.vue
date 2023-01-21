<template>
  <div class="courses">
    <Course
      v-for="(course, key) in courses"
      :key="key"
      :course="course"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Course from '@/components/molecules/Course.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  courses: {
    type: Array as PropType<Array<ICourse>>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courses.scss";
</style>
