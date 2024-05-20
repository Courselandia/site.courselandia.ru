<template>
  <div class="promotion-action">
    <Button
      no-loader
    >
      Открыть акцию
    </Button>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Button from '@/components/atoms/Button.vue';
import type IPromotion from '@/interfaces/stores/promo/promotion';

defineProps({
  promotion: {
    type: Object as PropType<IPromotion>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promotionAction";
</style>
