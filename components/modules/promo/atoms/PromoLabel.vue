<template>
  <div
    v-if="type === EType.PRESENT"
    class="promo-label promo-label--present"
  >
    Подарок
  </div>
  <div
    v-else-if="type === EType.DISCOUNT"
    class="promo-label promo-label--discount"
  >
    Скидка
  </div>
  <div
    v-else-if="type === 'promotion'"
    class="promo-label promo-label--promotion"
  >
    Акция
  </div>
</template>

<script setup lang="ts">
import EType from '@/enums/stores/promo/type';

defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promoLabel";
</style>
