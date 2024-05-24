<template>
  <div class="follow-course-promocode-popover-code-info">
    <CoursePromocodePopoverCodeInfoMessage />
    <CoursePromocodePopoverCodeInfoShowCode
      :code="promocode.code"
      :url="promocode.url"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import CoursePromocodePopoverCodeInfoMessage from '@/components/modules/catalog/atoms/CoursePromocodePopoverCodeInfoMessage.vue';
import CoursePromocodePopoverCodeInfoShowCode from '@/components/modules/catalog/molecules/CoursePromocodePopoverCodeInfoShowCode.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

defineProps({
  promocode: {
    type: Object as PropType<IPromocode>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/followCoursePromocodePopoverCodeInfo";
</style>
