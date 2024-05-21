<template>
  <div
    v-if="discount"
    class="promocode-discount"
  >
    <template
      v-if="type === EDiscountType.PERCENT"
    >
      {{ discount }}%
    </template>
    <template
      v-else
    >
      {{ money(discount) }} ₽
    </template>
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
@import "@/assets/scss/components/modules/home/atoms/promoDiscount";
</style>
