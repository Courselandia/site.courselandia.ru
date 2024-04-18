<template>
  <div
    v-if="course.employments?.length"
    class="mb-40 mb-12-md"
  >
    <h2 class="title title--1">
      Помощь с трудоустройством
    </h2>

    <Employments
      :course="course"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Employments from '@/components/modules/course/molecules/Employments.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
