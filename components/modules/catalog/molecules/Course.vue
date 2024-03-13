<template>
  <div
    :class="`course ${nameClass}`"
  >
    <CourseTile
      v-if="type === ECourseType.TILE"
      v-model:active="active"
      :course="course"
    />
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
  ref,
} from 'vue';

import CourseTile from '@/components/modules/catalog/molecules/CourseTile.vue';
import ECourseType from '@/enums/components/molecules/courseType';
import type ICourse from '@/interfaces/components/molecules/course';

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

const nameClass = computed(() => {
  const classes = [];

  if (active.value) {
    classes.push('course--active');
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/course";
</style>
