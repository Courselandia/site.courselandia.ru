<template>
  <div class="promocode-action">
    <Button
      no-loader
    >
      Открыть промокод
    </Button>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Button from '@/components/atoms/Button.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

defineProps({
  promocode: {
    type: Object as PropType<IPromocode>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promocodeAction";
</style>
