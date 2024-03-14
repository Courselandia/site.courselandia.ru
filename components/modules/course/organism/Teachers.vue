<template>
  <div
    v-if="course.teachers?.length"
    class="mb-40 mb-12-md"
  >
    <h2 class="title title--1">
      Преподаватели
    </h2>

    <Teachers
      :course="course"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Teachers from '@/components/modules/course/molecules/Teachers.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
