<template>
  <div
    v-if="course.school?.promocode?.discount"
    class="course-promocode"
  >
    <div class="course-promocode__box">
      <CoursePromocodePopover
        :course="course"
      >
      </CoursePromocodePopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
} from 'vue';

import CoursePromocodeInfo from '@/components/modules/catalog/atoms/CoursePromocodeInfo.vue';
import CoursePromocodePopover from '@/components/modules/catalog/molecules/CoursePromocodePopover.vue';
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
