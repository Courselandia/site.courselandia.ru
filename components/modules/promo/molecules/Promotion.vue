<template>
  <div class="promo">
    <div class="promo__side promo__side--left">
      <PromoLabel
        type="promotion"
      />
    </div>
    <div class="promo__side promo__side--right">
      <PromoPeriod
        v-if="promotion.date_end"
        :date-end="promotion.date_end"
      />
      <PromoTitle
        :title="promotion.title"
      />
      <PromoDescription
        v-if="promotion.description"
        :description="promotion.description"
      />
      <PromotionAction
        :promotion="promotion"
        :school="school"
        :logo="logo"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import PromoDescription from '@/components/modules/promo/atoms/PromoDescription.vue';
import PromoLabel from '@/components/modules/promo/atoms/PromoLabel.vue';
import PromoPeriod from '@/components/modules/promo/atoms/PromoPeriod.vue';
import PromotionAction from '@/components/modules/promo/atoms/PromotionAction.vue';
import PromoTitle from '@/components/modules/promo/atoms/PromoTitle.vue';
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
  logo: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/promo";
</style>
