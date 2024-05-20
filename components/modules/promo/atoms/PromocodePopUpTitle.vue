<template>
  <div class="promocode-pop-up-title">
    <span>
      Скидка
      <template
        v-if="promocode.discount_type === EDiscountType.PERCENT"
      >
        {{ promocode.discount }}%
      </template>
      <template
        v-else-if="promocode.discount"
      >
        {{ money(promocode.discount) }} ₽
      </template>
    </span>
    на ваш заказ в {{ school }} по промокоду
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import EDiscountType from '@/enums/stores/promo/discountType';
import { money } from '@/helpers/number';
import type IPromocode from '@/interfaces/stores/promo/promocode';

const props = defineProps({
  promocode: {
    type: Object as PropType<IPromocode>,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promocodePopUpTitle";
</style>
