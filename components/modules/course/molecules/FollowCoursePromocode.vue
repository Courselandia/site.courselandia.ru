<template>
  <div
    v-if="course.school?.promocode?.discount"
    class="follow-course-promocode"
  >
    <div class="follow-course-promocode__box">
      <FollowCoursePromocodePopover
        :course="course"
      >
        <FollowCoursePromocodeInfo
          class="follow-course-promocode__info"
          :discount="course.school.promocode.discount"
          :type="course.school.promocode.discount_type"
        />
      </FollowCoursePromocodePopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
} from 'vue';

import FollowCoursePromocodeInfo from '@/components/modules/course/atoms/FollowCoursePromocodeInfo.vue';
import FollowCoursePromocodePopover from '@/components/modules/course/molecules/FollowCoursePromocodePopover.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/followCoursePromocode";
</style>
