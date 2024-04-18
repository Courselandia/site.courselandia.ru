<template>
  <ul class="course-box-program">
    <li
      v-for="(item, key) in course.program"
      :key="key"
      class="course-box-program__item"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/courseBoxProgram";
</style>
