<template>
  <div
    v-if="courses?.length"
    class="content"
  >
    <h2 class="title title--1">
      Похожие курсы
    </h2>

    <Courses
      :courses="courses"
      class="mb-8"
    />
  </div>
</template>
<script setup lang="ts">
import { type PropType } from 'vue';

import Courses from '@/components/modules/catalog/molecules/Courses.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  courses: {
    type: Array as PropType<Array<ICourse>>,
    required: false,
    default: () => [],
  },
});
</script>
