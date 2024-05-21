<template>
  <div class="promocodes">
    <Promocode
      v-for="(promocode, key) in promocodes"
      :key="key"
      :promocode="promocode"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Promocode from '@/components/modules/home/molecules/Promocode.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

defineProps({
  promocodes: {
    type: Array as PropType<Array<IPromocode>>,
    required: true,
  },
});
</script>
