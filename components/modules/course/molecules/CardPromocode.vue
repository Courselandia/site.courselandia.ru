<template>
  <div
    v-if="course.school?.promocode?.discount"
    class="card-promocode"
  >
    <CardPromocodeInfo
      :discount="course.school.promocode.discount"
      :type="course.school.promocode.discount_type"
    />
    <CardPromocodeAction
      :course="course"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import CardPromocodeInfo from '@/components/modules/course/atoms/CardPromocodeInfo.vue';
import CardPromocodeAction from '@/components/modules/course/molecules/CardPromocodeAction.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/cardPromocode";
</style>
