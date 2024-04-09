<template>
  <div
    v-if="course.teachers?.length"
    class="course-row-favorite"
  >
    <div class="course-row-favorite__items">
      <Teacher
        v-for="(teacher, key) in course.teachers"
        :key="key"
        :teacher="teacher"
        :mobile="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Teacher from '@/components/modules/course/atoms/Teacher.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/courseRowFavorite";
</style>
