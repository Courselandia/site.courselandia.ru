<template>
  <div class="card-promocode-info">
    <div class="card-promocode-info__label">
      Ещё
      <span class="card-promocode-info__discount">
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
      по промокоду
    </div>
    <div class="card-promocode-info__icon">
      ?
    </div>
  </div>
</template>

<script lang="ts" setup>
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
@import "@/assets/scss/components/modules/course/atoms/cardPromocodeInfo";
</style>
