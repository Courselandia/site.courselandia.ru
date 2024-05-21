<template>
  <div class="promo-pop-up">
    <PopUp
      v-model:active="activeValue"
    >
      <div class="promo-pop-up__logo">
        <PromoPopUpLogo
          :school="school"
          :logo="logo"
        />
      </div>
      <div class="promo-pop-up__title">
        <PromotionPopUpTitle
          :promotion="promotion"
          :school="school"
        />
      </div>
      <div
        v-if="promotion.date_end"
        class="promo-pop-up__period"
      >
        <PromoPopUpPeriod
          :date-end="promotion.date_end"
        />
      </div>
      <div class="promo-pop-up__action">
        <PromotionPopUpAction
          :url="promotion.url"
        />
      </div>
      <div class="promo-pop-up__disclaimer">
        <PromotionPopUpDisclaimer />
      </div>
    </PopUp>
  </div>
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import PopUp from '@/components/atoms/PopUp.vue';
import PromoPopUpLogo from '@/components/modules/promo/atoms/PromoPopUpLogo.vue';
import PromoPopUpPeriod from '@/components/modules/promo/atoms/PromoPopUpPeriod.vue';
import PromotionPopUpAction from '@/components/modules/promo/atoms/PromotionPopUpAction.vue';
import PromotionPopUpDisclaimer from '@/components/modules/promo/atoms/PromotionPopUpDisclaimer.vue';
import PromotionPopUpTitle from '@/components/modules/promo/atoms/PromotionPopUpTitle.vue';
import type IPromotion from '@/interfaces/stores/promo/promotion';

const props = defineProps({
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
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  'update:active': (_: boolean) => true,
});

const { active } = toRefs(props);

const activeValue = ref<boolean>(active.value);
const copied = ref(false);

watch(activeValue, () => {
  emit('update:active', activeValue.value);
});

watch(active, () => {
  activeValue.value = active.value;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/promoPopUp";
</style>
