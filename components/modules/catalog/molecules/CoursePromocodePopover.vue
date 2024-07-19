<template>
  <Popover
    v-if="course.currency"
  >
    <slot />
    <template #content>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import {
  type PropType,
} from 'vue';

import Popover from '@/components/atoms/Popover.vue';
import CoursePromocodePopoverButtonGo from '@/components/modules/catalog/atoms/CoursePromocodePopoverButtonGo.vue';
import CoursePromocodePopoverTitle from '@/components/modules/catalog/atoms/CoursePromocodePopoverTitle.vue';
import CoursePromocodePopoverCodeInfo from '@/components/modules/catalog/molecules/CoursePromocodePopoverCodeInfo.vue';
import CoursePromocodePopoverPrices from '@/components/modules/catalog/molecules/CoursePromocodePopoverPrices.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
