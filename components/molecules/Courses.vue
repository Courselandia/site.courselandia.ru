<template>
  <div :class="`courses ${nameClass}`">
    <Course
      v-for="(course, key) in courses"
      :key="key"
      :course="course"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
} from 'vue';

import Course from '@/components/molecules/Course.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  courses: {
    type: Array as PropType<Array<ICourse>>,
    required: true,
  },
  columns: {
    type: Number,
    required: false,
    default: 4,
  },
});

const nameClass = computed(() => {
  const classes = [];

  if (props.columns) {
    classes.push(`courses--columns-${props.columns}`);
  }

  return classes.join(' ');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courses.scss";
</style>
