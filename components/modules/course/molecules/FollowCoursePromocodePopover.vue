<template>
  <Popover
    v-if="course.currency"
  >
    <slot />
    <template #content>
      <CoursePromocodePopoverTitle />
      <CoursePromocodePopoverPrices
        :course="course"
      />
      <FollowCoursePromocodePopoverCodeInfo
        v-if="course.school?.promocode"
        :promocode="course.school.promocode"
      />
      <FollowCoursePromocodePopoverButtonGo
        :url="course.url"
      />
    </template>
  </Popover>
</template>

<script setup lang="ts">
import {
  type PropType,
} from 'vue';

import Popover from '@/components/atoms/Popover.vue';
import CoursePromocodePopoverTitle from '@/components/modules/catalog/atoms/CoursePromocodePopoverTitle.vue';
import CoursePromocodePopoverPrices from '@/components/modules/catalog/molecules/CoursePromocodePopoverPrices.vue';
import FollowCoursePromocodePopoverCodeInfo from '@/components/modules/catalog/molecules/FollowCoursePromocodePopoverCodeInfo.vue';
import FollowCoursePromocodePopoverButtonGo from '@/components/modules/course/atoms/FollowCoursePromocodePopoverButtonGo.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
