<template>
  <div
    v-if="course.school?.promocode?.discount"
    class="course-promocode"
  >
    <div
      class="course-promocode__box"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @focusin="onMouseEnter"
      @focusout="onMouseLeave"
    >
      <div ref="infoRef">
        <CoursePromocodeInfo
          class="course-promocode__info"
          :discount="course.school.promocode.discount"
          :type="course.school.promocode.discount_type"
        />
      </div>
      <div
        class="course-promocode__popover"
        :style="{ left: `${left}px` }"
      >
        <CoursePromocodePopover
          v-model:active="active"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
  ref,
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

const active = ref(false);
const widthPopover = 520;
const left = ref(0);
const infoRef = ref<HTMLElement | null>(null);
let timer: number | undefined;

const onMouseEnter = (): void => {
  active.value = true;

  if (infoRef.value) {
    const widthInfo = infoRef.value.getBoundingClientRect().width;
    left.value = ((widthPopover - widthInfo) / 2) * -1;
    window.clearTimeout(timer);
    timer = undefined;
  }
};

const onMouseLeave = (): void => {
  if (timer) {
    window.clearTimeout(timer);
    timer = undefined;
  }

  timer = window.setTimeout(() => {
    active.value = false;
  }, 150);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/coursePromocode";
</style>
