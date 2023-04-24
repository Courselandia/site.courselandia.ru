<template>
  <div :class="`courses ${nameClass}`">
    <template
      v-if="courses?.length"
    >
      <Course
        v-for="(course, key) in courses"
        :key="key"
        :course="course"
      />
    </template>
    <div
      v-else-if="hasSlot('empty')"
      class="courses__no-result"
    >
      <slot name="empty" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType, useSlots,
} from 'vue';

import Course from '@/components/molecules/Course.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  courses: {
    type: Array<ICourse>,
    required: true,
  },
  columns: {
    type: Number,
    required: false,
    default: 4,
  },
});

const slots = useSlots();
const hasSlot = (name: string) => !!slots[name];

const nameClass = computed(() => {
  const classes = [];

  if (props.columns && props.courses?.length) {
    classes.push(`courses--columns-${props.columns}`);
  }

  if (!props.courses?.length) {
    classes.push('courses--no-result');
  }

  return classes.join(' ');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courses.scss";
</style>
