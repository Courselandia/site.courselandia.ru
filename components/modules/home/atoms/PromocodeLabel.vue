<template>
  <div
    v-if="type === EType.PRESENT"
    class="promocode-label promocode-label--present"
  >
    Подарок
  </div>
  <div
    v-else-if="type === EType.DISCOUNT"
    class="promocode-label promocode-label--discount"
  >
    Скидка
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import EType from '@/enums/stores/promo/type';

defineProps({
  type: {
    type: String as PropType<EType>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/home/atoms/promocodeLabel";
</style>
