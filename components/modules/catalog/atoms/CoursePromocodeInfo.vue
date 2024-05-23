<template>
  <div class="course-promocode-info">
    <div class="course-promocode-info__label">
      <span class="course-promocode-info__more">
        Ещё
      </span>
      <span class="course-promocode-info__discount">
        <template
          v-if="type === EDiscountType.PERCENT"
        >
          -{{ discount }}%
        </template>
        <template
          v-else
        >
          -{{ money(discount) }} ₽
        </template>
      </span>
      <span class="course-promocode-info__by-promocode">
        по промокоду
      </span>
    </div>
    <div class="course-promocode-info__icon">
      ?
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import EDiscountType from '@/enums/stores/promo/discountType';
import { money } from '@/helpers/number';

defineProps({
  discount: {
    type: Number,
    required: true,
  },
  type: {
    type: String as PropType<EDiscountType>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/coursePromocodeInfo";
</style>
