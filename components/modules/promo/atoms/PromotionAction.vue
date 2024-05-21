<template>
  <div class="promotion-action">
    <Button
      no-loader
      @click="onClick"
    >
      Открыть акцию
    </Button>
    <PromotionPopUp
      v-model:active="active"
      :promotion="promotion"
      :school="school"
      :logo="logo"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import PromotionPopUp from '@/components/modules/promo/molecules/PromotionPopUp.vue';
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

const active = ref(false);

const onClick = () => {
  active.value = true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promotionAction";
</style>
