<template>
  <div
    v-if="course.teachers?.length"
    class="teachers"
  >
    <div class="teachers__items">
      <Teacher
        v-for="(teacher, key) in course.teachers"
        :key="key"
        :teacher="teacher"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Teacher from '@/components/modules/course/atoms/Teacher.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/teachers";
</style>
