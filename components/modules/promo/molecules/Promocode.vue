<template>
  <div class="promo">
    <div class="promo__side promo__side--left">
      <PromocodeDiscount
        v-if="promocode.discount && promocode.discount_type"
        :discount="promocode.discount"
        :type="promocode.discount_type"
      />
      <PromoLabel
        :type="promocode.type"
      />
    </div>
    <div class="promo__side promo__side--right">
      <PromoPeriod
        v-if="promocode.date_end"
        :date-end="promocode.date_end"
      />
      <PromoTitle
        :title="promocode.title"
      />
      <PromoDescription
        v-if="promocode.description"
        :description="promocode.description"
      />
      <PromocodeAction
        :promocode="promocode"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import PromocodeAction from '@/components/modules/promo/atoms/PromocodeAction.vue';
import PromocodeDiscount from '@/components/modules/promo/atoms/PromocodeDiscount.vue';
import PromoDescription from '@/components/modules/promo/atoms/PromoDescription.vue';
import PromoLabel from '@/components/modules/promo/atoms/PromoLabel.vue';
import PromoPeriod from '@/components/modules/promo/atoms/PromoPeriod.vue';
import PromoTitle from '@/components/modules/promo/atoms/PromoTitle.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

defineProps({
  promocode: {
    type: Object as PropType<IPromocode>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/promo";
</style>
