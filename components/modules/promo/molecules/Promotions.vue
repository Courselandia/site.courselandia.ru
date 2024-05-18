<template>
  <div
    class="promotions"
  >
    <Promotion
      v-for="(promotion, key) in promotions"
      :key="key"
      :promotion="promotion"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Promotion from '@/components/modules/promo/molecules/Promotion.vue';
import type IPromotion from '@/interfaces/stores/promo/promotion';

defineProps({
  promotions: {
    type: Array as PropType<Array<IPromotion>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/promotions";
</style>
