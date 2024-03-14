<template>
  <div class="card-prices">
    <div
      v-if="price || priceRecurrent"
      class="card-prices__price"
    >
      {{ priceRecurrent
        ? money(priceRecurrent)
        : money(price)
      }}
      {{ getCurrency(currency) }}
      <template v-if="priceRecurrent">
        в месяц
      </template>
    </div>
    <div
      v-if="(priceRecurrent && price) || priceOld"
      class="card-prices__additional"
    >
      <div
        v-if="priceRecurrent && price"
        class="card-prices__currency"
      >
        {{ money(price) }} {{ getCurrency(currency) }}
      </div>
      <div
        v-if="priceOld"
        class="card-prices__old"
      >
        {{ money(priceOld) }} {{ getCurrency(currency) }}
      </div>
    </div>
    <div
      v-if="!price && !priceRecurrent && !priceOld"
      class="card-prices__price"
    >
      Бесплатно
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';

import ECurrency from '@/enums/components/modules/catalog/currency';
import getCurrency from '@/helpers/currency';
import { money } from '@/helpers/number';

const props = defineProps({
  price: {
    type: Number,
    required: false,
    default: null,
  },
  priceRecurrent: {
    type: Number,
    required: false,
    default: null,
  },
  priceOld: {
    type: Number,
    required: false,
    default: null,
  },
  currency: {
    type: String as PropType<ECurrency>,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/cardPrices";
</style>
