<template>
  <div
    :class="`course ${nameClass}`"
  >
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
  ref,
  toRefs,
} from 'vue';

import CourseBox from '@/components/modules/catalog/molecules/CourseBox.vue';
import CourseRow from '@/components/modules/catalog/molecules/CourseRow.vue';
import CourseTile from '@/components/modules/catalog/molecules/CourseTile.vue';
import ECourseType from '@/enums/components/modules/catalog/courseType';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
  type: {
    type: String as PropType<ECourseType>,
    required: false,
    default: ECourseType.TILE,
  },
});

const active = ref(false);
const { type } = toRefs(props);

const nameClass = computed(() => {
  const classes = [];

  classes.push(`course--type-${type.value}`);

  if (active.value) {
    classes.push('course--active');
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/course";
</style>
