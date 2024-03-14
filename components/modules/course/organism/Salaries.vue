<template>
  <div
    v-if="hasSalaries"
    class="mb-40 mb-12-md"
  >
    <Salaries
      :course="course"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  type PropType,
  toRefs,
} from 'vue';

import Salaries from '@/components/modules/course/molecules/Salaries.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const { course } = toRefs(props);

const hasSalaries = computed((): boolean => {
  let has = false;

  if (course.value?.professions) {
    course.value?.professions.forEach((profession) => {
      if (profession.salaries?.length) {
        has = true;
      }
    });
  }

  return has;
});
</script>
