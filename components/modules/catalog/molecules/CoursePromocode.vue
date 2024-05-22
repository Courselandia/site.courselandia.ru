<template>
  <div
    v-if="course.school?.promocode?.discount"
    class="course-promocode"
  >
    <CoursePromocodeInfo
      :discount="course.school.promocode.discount"
      :type="course.school.promocode.discount_type"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import CoursePromocodeInfo from '@/components/modules/catalog/atoms/CoursePromocodeInfo.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/coursePromocode";
</style>
