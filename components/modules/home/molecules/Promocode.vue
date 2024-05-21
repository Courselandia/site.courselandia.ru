<template>
  <div class="promocode">
    HERE!
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type IPromocode from '~/interfaces/stores/promo/promocode';

defineProps({
  promocode: {
    type: Object as PropType<IPromocode>,
    required: true,
  },
});
</script>
