<template>
  <div class="promotion-pop-up-title">
    <span>
      Акция
    </span>
    — {{ promotion.title }}
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type IPromotion from '@/interfaces/stores/promo/promotion';

defineProps({
  promotion: {
    type: Object as PropType<IPromotion>,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promotionPopUpTitle";
</style>
