<template>
  <div
    v-if="course.processes?.length"
    class="mb-40 mb-12-md"
  >
    <h2 class="title title--1">
      Как проходит обучение
    </h2>

    <Processes
      :course="course"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Processes from '@/components/modules/course/molecules/Processes.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
