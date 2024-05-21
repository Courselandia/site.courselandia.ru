<template>
  <div class="promocodes">
    <Promocode
      v-for="(promocode, key) in promocodes"
      :key="key"
      :promocode="promocode"
    />
    <LinkAllPromocodes
      :amount="amount"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import LinkAllPromocodes from '@/components/modules/home/molecules/LinkAllPromocodes.vue';
import Promocode from '@/components/modules/home/molecules/Promocode.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

defineProps({
  promocodes: {
    type: Array as PropType<Array<IPromocode>>,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/home/molecules/promocodes";
</style>
